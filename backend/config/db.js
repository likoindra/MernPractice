import mongoose from "mongoose";

// script will connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // useCreateIndex: true,
    });
    console.log(`Mongoose Connected ${conn.connection.host}`);
    // connection.host => membuat monggose terconnect dengan database di mongo.db
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

export default connectDB;