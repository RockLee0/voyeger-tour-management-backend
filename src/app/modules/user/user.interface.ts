import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN="ADMIN",
    USER="USER",
    GUIDE="GUIDE"
}

export enum IsActive{
    ACTIVE="ACTIVE",
    INACTIVE="iNACTIVE",
    BLOCKED="BLOCKED"
}
//auth providers (how a user will be authenticated)
/**
 * email - password,
 * google authentication
 */
export interface IAuthProvider {
    provider : string , // credential(email, pass diya login krse)/google 
    providerId: string // credential r goodle authentication er alada ekta id jeta diya confirm kore j user choose credential or google authentication
}



export interface IUser {
    name: string,
    email: string,
    password?: string,
    phone?: string,
    picture?: string, 
    address?: string, 
    isDeleted?: boolean, 
    isActive?: IsActive,
    //isActive?: "Active" | "Inactive" | "Blocked",
    isVerified?: boolean, 
    role: Role,
    //role: "SUPER_ADMIN" | "ADMIN" | "USER" | "GUIDE",
    auths: IAuthProvider[],
    booking?: Types.ObjectId[],
    guides ?:Types.ObjectId[], 
}