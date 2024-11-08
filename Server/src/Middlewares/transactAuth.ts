import {Request , Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface TransactType{
    receiverId : number;
    senderId : number;
    amount : number;
}

interface customRequest extends Request{
    transactData? : TransactType ;
}

function transactAuth(req :customRequest, res:Response, next:NextFunction){
    const transactToken : string = req.headers.transacttoken as string;

    if(!transactToken){
        res.json({message : "Auth Error hogya hai", success: false});
        return;
    }

    try {
        const token = jwt.verify(transactToken , process.env.JWT_TRANSACT_SECRET as string);
        if(token){
            req.transactData = token as TransactType;
            next();
        }
        else{
            res.json({message : "invalid Token", success: false});
        }
    } catch (error) {
        res.json({message : "Error in transactAuth", success : false})
    }
}

export default transactAuth;