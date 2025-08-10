import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
