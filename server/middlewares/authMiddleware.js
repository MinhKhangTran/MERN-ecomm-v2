// global imports
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
// User import
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } else {
    res.status(400);
    throw new Error("Du hast keine Rechte dazu");
  }
  if (!token) {
    res.status(400);
    throw new Error("Du hast keine Rechte");
  }
});