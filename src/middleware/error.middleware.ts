import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: Error, req: Request, res:Response, next: NextFunction) => {
  console.error("Error", err.message);

  if(err.message){
    return res.status(409).json({
      success: false,
      message: err.message
    })
  }

  if (err.message === 'Invalid email or password') {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}
