import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { env } from "process";
 
let server: Server;
 
const startServer = async () =>{
    try{
    await mongoose.connect(envVars.DB_URL)
    console.log("connected to db");
    server = app.listen(envVars.PORT,()=>{
        console.log(`server is listening to port ${envVars.PORT}`)
    })
    }
    catch(error){
        console.log(error)
    }
}

startServer()

process.on("unhandledRejection", (err)=>{
    console.log("unhandled rejection error detected.. server is shutting down..",err);
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1)
})

process.on("uncaughtException", (err)=>{
    console.log("uncaught exception detected.. server is shutting down..",err);
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1)
})

process.on("SIGTERM",()=>{
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1)
})
