import { AppError } from "../../errorHelpers/AppError";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import e from "cors";

export const createUser =async (payload: Partial<IUser>)=>{
  //  const {name, email} = payload; It is enough to create a user. But what if the user gives other optional information. In this case it just drop them. Which is not a good practice
  //  const user = await User.create(payload) // good now. but what if you want to recheck the uniqueness of email. Or if the user already exist!
   
  const {email, password,...rest} = payload;
  //check user's existence
  const isUserExist = await User.findOne({email});
  if(isUserExist){
    throw new AppError(httpStatus.BAD_REQUEST, "user alreay exists")
  }

  //password protection
  const hashPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

  //now add the auth values. 
   const authProvider: IAuthProvider=  {
    provider: 'credentials',
    providerId: email as string
  }


  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest
   })
    return user
}

const updatedUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) =>{
    
  const ifUserExist =  await User.findById(userId);
  if(!ifUserExist){
    throw new AppError(httpStatus.FORBIDDEN, "This user cannot be updated as it doesn't exist")
  }
  
  if (payload.role){
      if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
         throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
      }
      if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN){
         throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
      }
    }
      if (payload.isActive || payload.isDeleted || payload.isVerified){
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
         throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
      }
      if (payload.password){
        payload.password = await bcrypt.hash(payload.password,envVars.BCRYPT_SALT_ROUND)
      }
      const newUpdateUser =  await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true })
      return newUpdateUser;
}

export const getAllUsers = async ()=>{
    const allUsers = await User.find({})
    const totalUsers= await User.countDocuments()
    return {
        data: allUsers,
        meta:{ total: totalUsers}
    }
}


export const userService = {
    createUser, updatedUser, getAllUsers
}