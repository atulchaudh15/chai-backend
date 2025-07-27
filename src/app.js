import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16Kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js";

//routes declaration
//jse kisi n user url diya to hm control shift kr dnege userRouter ko

app.use("/api/v1/users", userRouter)

//url kch esa dikhega 
//http://localhost:8000/api/v1/users/register

export {app}