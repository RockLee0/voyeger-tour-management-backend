import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

const creddentialsLogin = async (payload: Partial<IUser>)=>{
    const {email, password} = payload
    const isUserExist = await User.findOne({email})
    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "You haven't even registered yet with this email!!")
    }
    const isPasswordMatched = await bcrypt.compare(password as string,isUserExist.password as string)
    if(!isPasswordMatched){
        throw new AppError (StatusCodes.BAD_REQUEST,"Wrong Password");
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    console.log(isUserExist.role);
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    return {
        accessToken
    }

}

export const AuthServices = {
    creddentialsLogin
} 