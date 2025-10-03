import dotenv from "dotenv"
import { keyof } from "zod"
dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production"   
}

const loadEnvVariables = () =>{
    const requiredEnvVaiables: string[] = ["PORT", "DB_URL","NODE_ENV" ]
    requiredEnvVaiables.forEach(key =>{
        if(!process.env[key]){
            throw new Error(`Missing, require environment variable ${key}`)
        }
    })
    return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production"
}
}

export const envVars = loadEnvVariables()