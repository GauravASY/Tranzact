import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


interface customRequest extends Request{
    userId? : number;
}

function authorization(req: customRequest, res: Response, next: NextFunction) {
  const token = req.headers.token;

  try {
    if (!token) {
      res.json({ message: "Sign-In first", success: false });
    }
    else{
    const verify = jwt.verify(token as string, process.env.JWT_SECRET as string );

    if (verify) {
      req.userId = Number(verify);
      next();
    } else {
      res.json({ message: "Not signed-in", success: false });
    }
  }
  } catch (error) {
    res.json({message : "Something went wrong", success : false})
  }
}

export default authorization;
