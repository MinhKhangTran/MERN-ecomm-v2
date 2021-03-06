// global imports
import express from "express";
// controllers
import {
  registerUser,
  loginUser,
  getLoggedUser,
  updateProfileOwner,
  getAllUsers,
  deleteUser,
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
import { grantAccess } from "../middlewares/roleMiddleware.js";

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
  .put(protect, grantAccess("updateOwn", "profile"), updateProfileOwner);
// get all users ADMIN
router.route("/").get(protect, grantAccess("readAny", "profile"), getAllUsers);
// Delete a user Admin
router
  .route("/:id")
  .delete(protect, grantAccess("deleteAny", "profile"), deleteUser);

export default router;
