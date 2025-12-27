import { NextFunction, Request, Response } from "express";
import { AppError } from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { Role } from "../modules/user/user.interface";

//authMiddleware
export const checkAuth = (...authRoles : string[]) => async (req:Request, res: Response, next: NextFunction)=>{
    try{
    const accessToken= req.headers.authorization;
    if(!accessToken){
        throw new AppError(403,"There is no access token to enter this route");
    }
    const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET)
    if (typeof verifiedToken === "string") {
  throw new AppError(401, "Invalid token");
   }
   if (!authRoles.includes((verifiedToken as JwtPayload).role)) {
    throw new AppError(
    403,
    "You have token but not for this route. Therefore you are not authorized to enter."
  );
}
    req.user = verifiedToken;
    next()
    }catch(error)
    {
        next(error)
    }
}
