import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    console.log("✅ Already connected to MongoDB");
    return handler(req, res);
  }

  try {
    await mongoose.connect("mongodb://localhost:27017/All_data", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return res.status(500).json({ error: "Database connection failed" });
  }

  return handler(req, res);
};

export default connectDB;
