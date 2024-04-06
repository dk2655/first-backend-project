import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"





const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MOngoDB connected successfully`);
    } catch (error) {
        console.log("MONGODB connection erroe ", error);
        process.exit(1)
    }
}

export default connectDB