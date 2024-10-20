import z from 'zod';
import { Request, Response, NextFunction } from 'express';

function validation(req:Request, res:Response, next:NextFunction){
    const requiredBody = z.object({
        username : z.string().max(50).min(3),
        email : z.string().email({message : "Wrong Email"}).min(6).max(50),
        password : z.string().max(50).min(5, {message : "password too small"})
    });

    requiredBody.safeParse(req.body).success ? next() : res.json({message : "Check Credentials. Validation Failed"});
}

export default validation;