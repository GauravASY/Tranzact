import {Router} from 'express'
import { PrismaClient } from '@prisma/client';
import transactAuth from '../Middlewares/transactAuth';
import { Request } from 'express';
import authorization from '../Middlewares/authorization';

const transactRouter = Router();
const prisma = new PrismaClient();


interface TransactType{
    receiverId : number;
    senderId : number;
    amount : number;
}

interface customRequest extends Request{
    transactData? : TransactType;
    userId?: Number;
}

transactRouter.post("/create", transactAuth, async(req : customRequest, res) => {
    const transactData = req.transactData;
    const {sender, receiver} = req.body;
    const dateNow = new Date();
    const dateString = dateNow.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });

    try {
         await prisma.transaction.create({
            data :{
                date : dateString,
                sender : transactData?.senderId as number,
                receiver : transactData?.receiverId as number,
                senderName : sender,
                receiverName : receiver,
                amount : transactData?.amount as number,
            }
        })
            res.json({message : "transaction created", success : true});
    } catch (error) {
        res.json({message : "Transaction not created", success: false});
    }
} )

transactRouter.get("/getTransactions", authorization, async(req : customRequest, res)=>{
    const userId = req.userId;
    try {
        const transactions = await prisma.transaction.findMany({
            where : { OR: [
                { sender: userId as number},
                { receiver: userId as number}
              ]}
        })

        res.json({transactions : transactions, message : "Fetching Successful", success:true})
    } catch (error) {
        res.json({message : "Error in fetching", success : false});
    }
} )


export default transactRouter;