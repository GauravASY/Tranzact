import { PrismaClient } from "@prisma/client";
import { Router, Request } from "express";
import authorization from "../Middlewares/authorization";

const accountRouter = Router();
const prisma = new PrismaClient();

interface customRequest extends Request {
    userId?: Number;
  }

accountRouter.get("/getBalance", authorization,async (req:customRequest, res)=>{
    const userId = req.userId;

    try {
        const data = await prisma.account.findFirst({
            where : { userId : userId as number}
        })
        res.json({message : "Fetch successful", success: true, account: data});
    } catch (error) {
        res.json({message : "Error in fetching account info", success : false});
    }
})


export default accountRouter;