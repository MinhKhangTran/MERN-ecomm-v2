// Imports
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
// import connectDB
import connectDB from "./config/db.js";

// import routes
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import uploadRoutes from "./routes/uploads.js";

// import made middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

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
app.use("/api/a1/users", userRoutes);
app.use("/api/a1/products", productRoutes);
app.use("/api/a1/orders", orderRoutes);
app.use("/api/a1/uploads", uploadRoutes);

// static folder for uploads
// faking __dirname
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// for deploying
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// error middleware
app.use(notFound);
app.use(errorHandler);

// port running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server rennt auf dem Port ${PORT}`.blue.inverse);
});
