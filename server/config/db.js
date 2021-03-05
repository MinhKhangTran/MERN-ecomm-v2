import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`Verbunden mit der DB ${conn.connection.host}`.yellow.bold);
  } catch (error) {
    console.log(`Error:${error}`.red.underline);
    process.exit(1);
  }
};
export default 