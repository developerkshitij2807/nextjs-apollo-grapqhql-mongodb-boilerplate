import mongoose from "mongoose";


// define MongoDB Url in the environment variables
const localUri = process.env.MONGODB_URL;
const connection = {};
export async function connectDb() {
  if (connection.isConnected) {
    console.log("DB is already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(localUri);
  console.log("? MongoDB Database Connected Successfully");
  connection.isConnected = db.connections[0].readyState;
}

export async function disconnectDB() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not discounted");
    }
  }
}
