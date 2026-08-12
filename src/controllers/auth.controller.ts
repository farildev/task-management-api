import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.services";

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try{
      const {name, email, password} = req.body;
      const result = await AuthService.register(name, email,password);
      res.status(201).json({
        success: true,
        data: result
      })
    }catch (err) {
      next(err);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
  logout: async (req:Request, res:Response) => {
    res.json({
      success: true,
      message: "Logged out successfully"
    })
  }
}
