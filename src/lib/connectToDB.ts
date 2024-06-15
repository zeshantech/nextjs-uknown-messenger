import mongoose from "mongoose";

export async function connectToDB() {
  let isConnected = mongoose.connection.readyState;
  if (isConnected) return;

  console.log("Initializing MongoDB connection...");

  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("MongoDB connection initialized.");
}
