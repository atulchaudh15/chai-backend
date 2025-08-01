import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB= async () => {
    try{
       const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\n Mongodb connected successfully  DB Host : ${connectionInstance.connection.host}`);

    } catch (error){
        console.error("Mongodb connection error :", error);
        process.exit(1);
    }
}

export default connectDB;  