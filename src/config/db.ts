import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const isConnected = mongoose.connection.readyState;
    if (isConnected) {
      console.log("MongoDB is connected");
    } else {
      mongoose
        .connect("mongodb://localhost:27017/veterian_hospital")
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
