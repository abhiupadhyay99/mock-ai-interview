import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connString = process.env.mongodb || process.env.LOCAL_MONGODB || "mongodb://127.0.0.1:27017/interviewprep";
    const isCloud = connString.includes("mongodb+srv:");

    // Mask password before logging for Atlas URI
    const maskedConn = connString.replace(/:([^@]+)@/, ":****@");
    console.log(`🔍 Attempting to connect to MongoDB (${isCloud ? "Cloud/Atlas" : "Local"}): ${maskedConn}`);
    
    await mongoose.connect(connString, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    
    if (error.message.includes("querySrv ECONNREFUSED") || error.message.includes("selection timeout")) {
      console.log("💡 TIP: Local machine is blocked from Atlas. Falling back to local MongoDB...");
      if (process.env.LOCAL_MONGODB && process.env.NODE_ENV !== "production") {
         try {
           console.log("🔄 Retrying with local MongoDB...");
           await mongoose.connect(process.env.LOCAL_MONGODB);
           console.log(`✅ Successfully fallback to Local MongoDB: ${mongoose.connection.host}`);
           return;
         } catch (fallbackError) {
           console.error(`❌ Fallback failed: ${fallbackError.message}`);
         }
      }
      console.log("💡 Check your IP whitelist in MongoDB Atlas or ensure local MongoDB is running.");
    }
  }
};


