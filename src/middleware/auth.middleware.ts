import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { success } from "zod";

export const authMiddleware = (req: Request, res:Response, next:NextFunction) => {
  try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      })
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwt.secret) as {
      id: string;
      role: string;
    }

    req.user= decoded;
    next();
  }catch(err){
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}
