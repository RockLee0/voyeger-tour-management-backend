import dotenv from "dotenv"
import { keyof } from "zod"
dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUND : string,
    JWT_ACCESS_EXPIRES: string, 
    JWT_ACCESS_SECRET: string

}

const loadEnvVariables = () =>{
    const requiredEnvVaiables: string[] = ["PORT", "DB_URL","NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_EXPIRES", "JWT_ACCESS_SECRET" ]
    requiredEnvVaiables.forEach(key =>{
        if(!process.env[key]){
            throw new Error(`Missing, require environment variable ${key}`)
        }
    })
    return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string
}
}

export const envVars = loadEnvVariables()