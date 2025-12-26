import z from "zod";
import { IsActive, Role } from "./user.interface";

 export   const createUserZodSchema = z.object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }),

      email: z
        .string()
        .email({ message: "Invalid email format" })
        .max(50, { message: "Email cannot exceed 50 characters" }),

      password: z
        .string()
        .min(8, { message: "Password must be at least 6 characters" }).optional(),
// use regex :  1 uppercae, 1 special character, 1 digit, 8 characters min
      phone: z
        .string()
        .min(10, { message: "Phone number must have at least 10 digits" }).optional(),
//regex: bd phone number
      address: z.string().optional(),
    });


 export   const updateUserZodSchema = z.object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }).optional(),
      password: z
        .string()
        .min(8, { message: "Password must be at least 6 characters" }).optional(),
// use regex :  1 uppercae, 1 special character, 1 digit, 8 characters min
      phone: z
        .string()
        .min(10, { message: "Phone number must have at least 10 digits" }).optional(),
//regex: bd phone number
      
      role: z.enum(Object.values(Role) as [string]).optional(),
      IsActive: z.enum(Object.values(IsActive)).optional(),
      isDeleted: z.boolean().optional(),
      isVarified: z.boolean().optional(),
     address: z.string().optional(),
    });