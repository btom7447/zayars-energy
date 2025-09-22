import mongoose from "mongoose";

let isConnected = false; // track connection

export async function connectToDB() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB,
        });
        isConnected = true;
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
    }
}
