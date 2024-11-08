import { Router, Request } from "express";
import validation from "../Middlewares/validation";
import authorization from "../Middlewares/authorization";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const userRouter = Router();

interface customRequest extends Request {
  userId?: Number;
}

userRouter.post("/signup", validation, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where : {email : email}
    });
    if(user){
      res.json({message : "email already registered", success:false});
    }
    else{
    const hashedPassword = await bcrypt.hash(password, 5);
    const {id} = await prisma.user.create({
      data: { username, password: hashedPassword, email },
    });
    await prisma.account.create({
        data : {
            userId : id,
            amount : 100
        }
    })
    res.json({ message: "User Created", success: true });
  }
 } catch (error) {
    res.json({ message: "Task Failed", success: false });
  }
});

userRouter.post("/signin", validation, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      const hashedPassword = user.password;
      const passwordCheck = await bcrypt.compare(password, hashedPassword);
      if (passwordCheck) {
        const token = jwt.sign(
          user.id.toString(),
          process.env.JWT_SECRET as string
        );
        res.json({
          token: token,
          message: "Sign-in Successful",
          success: true,
        });
      } else {
        res.json({ message: "Incorrect password", success: false });
      }
    } else {
      res.json({ message: "No user found. Sign-up first", success: true });
    }
  } catch (error) {
    res.json({ message: error, success: false });
  }
});

userRouter.get("/list", authorization, async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json({ usersList: allUsers, message: "fetching done", success: true });
  } catch (error) {
    res.json({ message: "fetching failed", success: false });
  }
});

userRouter.post(
  "/sendMoney",
  authorization,
  async (req: customRequest, res) => {
    const userId = req.userId;
    const { sendTo, amount } = req.body;

    try {
      const accFrom = await prisma.account.findFirst({
        where: { userId: userId as number },
      });

      const accTo = await prisma.account.findFirst({
        where: { userId: sendTo },
      });

      const transactString = {
        senderId : accFrom?.userId,
        receiverId : accTo?.userId,
        amount : amount
      }

      if (accTo && accFrom && accFrom.amount >= amount) {
        await prisma.$transaction([
          prisma.account.update({
            where: { id: accFrom.id },
            data: { amount: { decrement: amount } },
          }),

          prisma.account.update({
            where: { id: accTo.id },
            data: { amount: { increment: amount } },
          }),
        ]);
       
        const transactToken = jwt.sign(JSON.stringify(transactString), process.env.JWT_TRANSACT_SECRET as string )
        res.json({ message: "transaction successfull", success: true, transactToken: transactToken });
      }
      else{
        res.json({message : "Transaction Failed. Check Account", success : false})
      }
    } catch (error) {
      res.json({ message: error, success: false });
    }
  }
);

userRouter.get("/getuser", authorization, async (req:customRequest, res)=>{
    const userId = req.userId;

    try {
      const user = await prisma.user.findUnique({
        where:{id : userId as number}
      })
      res.json({
        user : user, message : "User Found", success: true
      });
    } catch (error) {
      res.json({message : "something went wrong", success : false});
    }
})

export default userRouter;
