import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const MONGO_URI: string = process.env.MONGO_URI!;
  try {
    const isConnected = mongoose.connection.readyState;
    if (isConnected) {
      console.log("MongoDB is connected");
    } else {
      mongoose
        .connect(MONGO_URI)
        .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`))
        .catch((err) => {
          console.error(`Error: ${err.message}`);
          process.exit(1);
        });
    }
  } catch (err) {
    console.log(err);
    // console.error(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
