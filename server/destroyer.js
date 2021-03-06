// global
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
// db
import connectDB from "./config/db.js";
// Models
import Order from "./models/Order.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

// configure dotenv
dotenv.config();
// connectDB
connectDB();

const destroyErryThing = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Alles wurde gelöscht".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

destroyErryThing();
