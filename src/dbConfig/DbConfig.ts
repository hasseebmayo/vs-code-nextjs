import mongoose from "mongoose";

export async function mongoDBConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB is connected sucessfully!");
    });
    connection.on("error", (err) => {
      console.log("Connection ERR", err);
    });
  } catch (error) {
    console.log(error);
  }
}
