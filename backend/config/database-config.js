import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connString = process.env.mongodb || "mongodb://127.0.0.1:27017/interviewprep";
    console.log(`Attempting to connect to MongoDB...`);
    await mongoose.connect(connString);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Don't exit process in Vercel/serverless environment, but log it clearly
  }
};


