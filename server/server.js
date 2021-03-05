// Imports
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
// import connectDB
import connectDB from "./config/db.js";

// import routes

// import made middlewares

// dotenv config
dotenv.config();

// database connect
connectDB();

// app init
const app = express();

// middlewares
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "TestTest" });
});

// error middleware

// port running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server rennt auf dem Port ${PORT}`.blue.inverse);
});
