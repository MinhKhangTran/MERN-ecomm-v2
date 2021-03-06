// global imports
import express from "express";
// controllers
import {
  getAllOrders,
  getMyOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrderById,
  createOrder,
} from "../controllers/orders.js";

// validator
import { runValidation } from "../validators/index.js";
import {} from "../validators/orderValidator.js";
// authMiddleware
import { protect } from "../middlewares/authMiddleware.js";
// roles
import { grantAccess } from "../middlewares/roleMiddleware.js";

// init route
const router = express.Router();

router.route("/");
router.route("/myorders");
router.route("/:id");
router.route("/:id/pay");
router.route("/:id/deliver");

export default router;
