import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.mongodb || "mongodb://127.0.0.1:27017/interviewprep");
  console.log("MongoDB connected");
};


