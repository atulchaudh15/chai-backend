
import connectDB from "./db/index.js";
import dotenv from 'dotenv';
import {app} from "./app.js"

dotenv.config({ path: './.env' });


console.log("👉 CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("👉 CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("👉 CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Yeh baahar hona chahiye
app.on("error", (error) => {
  console.error("Server error:", error);
  throw error;
});













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