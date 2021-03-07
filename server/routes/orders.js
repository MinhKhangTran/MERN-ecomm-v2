// global imports
import express from "express";
// controllers
import {
  getAllOrders,
  getMyOrders,
  updateOrderToPaid,
  getOrderById,
  createOrder,
} from "../controllers/orders.js";

// validator
import { runValidation } from "../validators/index.js";
import { createOrderValidator } from "../validators/orderValidators.js";
// authMiddleware
import { protect } from "../middlewares/authMiddleware.js";
// roles
import { grantAccess } from "../middlewares/roleMiddleware.js";

// init route
const router = express.Router();

// create order
router
  .route("/")
  .post(protect, createOrder)
  .get(protect, grantAccess("readAny", "orders"), getAllOrders);
router
  .route("/myorders")
  .get(protect, grantAccess("readOwn", "orders"), getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
