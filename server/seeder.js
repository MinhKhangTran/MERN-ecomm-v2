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
// data
import products from "./data/products.js";

// configure dotenv
dotenv.config();
// connectDB
connectDB();

const importErrything = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Default Produkte wurden importiert".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importErrything();
