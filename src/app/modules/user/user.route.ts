import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { z, ZodObject, ZodType, ZodTypeAny } from "zod";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { AppError } from "../../errorHelpers/AppError";
import  jwt, { JwtPayload}  from "jsonwebtoken";
import { Role } from "./user.interface";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { checkAuth } from "../../middlewares/checkAuth";

const route = Router();
//--------post user data ------------//
route.post(
  //1. hit krlo 
  "/register",
  //2. validate krlo
  validateRequest(createUserZodSchema),
  //3. controller a filtered data pathailo for database operations
  UserControllers.createUser
);

//---------get all users-----------//

route.get("/allusers",checkAuth(Role.ADMIN, Role.SUPER_ADMIN) ,UserControllers.getAllUsers);

export const UserRoutes = route;


//version 1
/**
 * route.post(
  "/register",
  async(req: Request, res: Response, next: NextFunction) => {
    const createUserZodSchema = z.object({
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


    req.body = await createUserZodSchema.parseAsync(req.body);
    next();
  },
  UserControllers.createUser
);

 */

//version 2
/**
 * //--------post user data ------------//
route.post(
  //1. hit krlo 
  "/register",
  //2. validate krlo
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = await createUserZodSchema.parseAsync(req.body);
    next();
  },
  //3. controller a filtered data pathailo for database operations
  UserControllers.createUser
);
 */
//version 3
/**
 * version 3 final
 * //--------post user data ------------//
route.post(
  //1. hit krlo 
  "/register",
  //2. validate krlo
  validateRequest(createUserZodSchema),
  //3. controller a filtered data pathailo for database operations
  UserControllers.createUser
);

 */