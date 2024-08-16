import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connection Established !")
    } catch (error) {
        console.log(`Error : ${error}`);
    }
}
