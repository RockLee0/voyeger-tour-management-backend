import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateRequest = (f : ZodTypeAny) =>{
  return async (req: Request, res: Response, next: NextFunction) => {
    try{
    req.body = await f.parseAsync(req.body);
    next()
    }catch (error) {
      next(error);
    }
  }
}
