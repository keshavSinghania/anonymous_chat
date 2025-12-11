import mongoose from "mongoose";
import { clearScreenDown } from "readline";

export const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://user:pass@confessionroom.rvxzsfy.mongodb.net/?appName=ConfessionRoom")
        console.log("MongoDb connected successfully")
    } catch (error) {
        console.log("Db connection error:", error)        
    }
}