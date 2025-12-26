import { AppError } from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs"
import { envVars } from "../../config/env";

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

export const getAllUsers = async ()=>{
    const allUsers = await User.find({})
    const totalUsers= await User.countDocuments()
    return {
        data: allUsers,
        meta:{ total: totalUsers}
    }
}


export const userService = {
    createUser, getAllUsers
}