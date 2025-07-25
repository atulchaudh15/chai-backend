
import connectDB from "./db/index.js";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

connectDB()












/*
import express from "express";
const app= express()
//ye hmne use kiya h iffi
;(  async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      app.on("error",)
    } catch (error) {
        console.error("ERROR: ", error)
    }



})()     */