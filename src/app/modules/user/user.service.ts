import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUser =async (payload: Partial<IUser>)=>{
    const {name, email} = payload;
    const user = await User.create({
        name, email
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