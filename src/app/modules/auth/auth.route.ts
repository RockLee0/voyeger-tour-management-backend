import { Router } from "express";
import { AuthController } from "./auth.controller";

const route = Router()

//Authroute no.1:  Custom Login 
route.post("/login", AuthController.creddentialsLogin)



//2.Authroute no.2: Logout




export const AuthRoutes = route; 
