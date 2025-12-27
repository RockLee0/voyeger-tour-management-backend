import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";






/**
 * 
const createUser= async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const user =await userService.createUser(req.body)
        res.status(httpStatus.CREATED).json({
            message: " User created Successfully",user
        })
    }
    catch(error:any){
        next(error)
    }
}
 */
const createUser= catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    console.log(req.body)    
    const user =await userService.createUser(req.body)
        
        /**
         *  res.status(httpStatus.CREATED).json({
            message: " User created Successfully",user
        })

         */

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "User created Successfully",
            data: user
        })
})

const updateUser= catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    console.log(req.body) 
    const userId = req.params.id;
    const token = req.headers.authorization;
    const isVerifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET); 
    const payload = req.body;
    const user =await userService.updatedUser(userId, payload, verifyToken)

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "User updated Successfully",
            data: user
        })
})

const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result= await userService.getAllUsers()
  
  /**
   * 
   *   res.status(httpStatus.OK).json({
        message: " Users retrived Successfully",allUsers
    })
  *  */ 


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: " Users retrived Successfully",
        data: result.data,
        meta: result.meta
    })
})


export const UserControllers = {
    createUser, getAllUsers
}