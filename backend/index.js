import express from "express";
import cors from "cors"; //! 2) we are importing cors module which we installed using npm 1
import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database-config.js";

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
const PORT = process.env.PORT || 7001;

//~ declare routes --> app.http_method('endpoint' , callback)
app.get("/", (req, res) => {
  //   res.send("req is sending");

  app.get("/about", (req, res) => {
    res.status(200).json({
      message: "About page",
    });
  });

  res.status(500).json({
    success: true,
    message: "Okay",
    data: { userName: "NIGHT CODER" },
  });
});

//~ 3. assign a port number to aur server
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server Started.....");
  connectDB();
});
