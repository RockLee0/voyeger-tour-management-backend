import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import  htttpStatus  from "http-status-codes";
 
const creddentialsLogin = async (req: Request,res: Response, next: NextFunction)=>{
    const loginInfo =await AuthServices.creddentialsLogin(req.body)
        sendResponse(res, {
            statusCode: htttpStatus.ACCEPTED,
            success: true,
            message: "User authenticated Successfully",
            data: loginInfo
        })
    
}


export const AuthController = {
    creddentialsLogin
}