import express from "express";
import cors from "cors"; //! 2) we are importing cors module which we installed using npm 1
import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database-config.js";
import mongoose from "mongoose";

dotenv.config();
//! 1) we are importing express module which we installed using npm 1
//! call/invoke the function

let app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api/diagnostics", (req, res) => {
  const connString = process.env.MONGODB_URI || process.env.MONGODB || process.env.mongodb || process.env.LOCAL_MONGODB || "mongodb://127.0.0.1:27017/interviewprep";
  const maskedConn = connString.replace(/:([^@]+)@/, ":****@");
  
  res.json({
    env: {
      has_mongodb_lowercase: !!process.env.mongodb,
      has_mongodb_uppercase: !!process.env.MONGODB,
      has_mongodb_uri: !!process.env.MONGODB_URI,
      has_local_mongodb: !!process.env.LOCAL_MONGODB,
      node_env: process.env.NODE_ENV || "not set",
    },
    mongoose: {
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || "none",
    },
    resolvedConnString: maskedConn,
  });
});
const PORT = process.env.PORT || 7001;

//~ declare routes --> app.http_method('endpoint' , callback)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Okay",
    data: { userName: "NIGHT CODER" },
  });
});

app.get("/about", (req, res) => {
  res.status(200).json({
    message: "About page",
  });
});

// Initialize database globally for Vercel Serverless
connectDB();

// Only listen locally, Vercel handles requests via the exported app
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server Started.....");
  });
}

export default app;
