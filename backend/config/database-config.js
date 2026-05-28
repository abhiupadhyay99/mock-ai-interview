import mongoose from "mongoose";

export let connectionError = null;
let cachedConnection = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    return cachedConnection;
  }

  const connString = process.env.MONGODB_URI || process.env.MONGODB || process.env.mongodb || process.env.LOCAL_MONGODB || "mongodb://127.0.0.1:27017/interviewprep";
  const isCloud = connString.includes("mongodb+srv:");

  const maskedConn = connString.replace(/:([^@]+)@/, ":****@");
  console.log(`🔍 Attempting to connect to MongoDB (${isCloud ? "Cloud/Atlas" : "Local"}): ${maskedConn}`);

  cachedConnection = mongoose.connect(connString, {
    serverSelectionTimeoutMS: 5000,
  })
    .then((conn) => {
      console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
      connectionError = null;
      return conn;
    })
    .catch(async (error) => {
      console.error(`❌ Error connecting to MongoDB: ${error.message}`);
      connectionError = error.message;

      if (error.message.includes("querySrv ECONNREFUSED") || error.message.includes("selection timeout")) {
        console.log("💡 TIP: Local machine is blocked from Atlas. Falling back to local MongoDB...");
        if (process.env.LOCAL_MONGODB && process.env.NODE_ENV !== "production") {
          try {
            console.log("🔄 Retrying with local MongoDB...");
            const fallbackConn = await mongoose.connect(process.env.LOCAL_MONGODB);
            console.log(`✅ Successfully fallback to Local MongoDB: ${mongoose.connection.host}`);
            connectionError = null;
            return fallbackConn;
          } catch (fallbackError) {
            console.error(`❌ Fallback failed: ${fallbackError.message}`);
            connectionError = fallbackError.message;
            throw fallbackError;
          }
        }
      }
      throw error;
    });

  return cachedConnection;
};


