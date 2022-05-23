import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to database");
    return;
  }

  mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
    if (err) throw err;
    console.log("Successfully connected to database");
  });
};

export default connectDB;
