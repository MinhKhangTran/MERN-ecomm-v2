// global imports
import express from "express";
// controllers
import {
  registerUser,
  loginUser,
  getLoggedUser,
  updateProfileOwner,
} from "../controllers/users.js";

// validator
import { runValidation } from "../validators/index.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/userValidators.js";
// authMiddleware
import { protect } from "../middlewares/authMiddleware.js";
// roles

// init route
const router = express.Router();
// Register
router.route("/register").post(registerValidator, runValidation, registerUser);
// Login
router.route("/login").post(loginValidator, runValidation, loginUser);

// me
router
  .route("/me")
  .get(protect, getLoggedUser)
  .put(protect, updateProfileOwner);

export default router;
