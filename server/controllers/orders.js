// global imports
import asyncHandler from "express-async-handler";

// import model
import Order from "../models/Order.js";

// @desc    Create new order
// @route   POST api/a1/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shipingAddress,
    paymentMethod,
    totalPrice,
    isPaid,
    paidAt,
  } = req.body;
  //   check if there are any orders

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Es gibt keine Bestellungen");
  } else {
    const order = await Order.create({
      orderItems,
      shipingAddress,
      paymentMethod,
      totalPrice,
      isPaid,
      paidAt,
      user: req.user.id,
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(400);
      throw new Error("Es gab ein Fehler");
    }
  }
});

// @desc    get Order by ID
// @route   GET api/a1/orders/:id
// @access  private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "username email"
  );
  if (!order) {
    res.status(400);
    throw new Error("Keine Bestellung gefunden!");
  }
  res.status(200).json(order);
});

// @desc    get Order from logged User
// @route   GET api/a1/orders/myorders
// @access  private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "user",
    "username email"
  );
  if (!orders) {
    res.status(400);
    throw new Error("Keine Bestellungen gefunden!");
  }
  res.status(200).json(orders);
});

// @desc    update a order to paid
// @route   PUT api/a1/orders/:id/pay
// @access  private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(400);
    throw new Error("Keine Bestellung gefunden!");
  }
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
  }
  const updatedOrder = await order.save();
  if (updatedOrder) {
    res.status(200).json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Es gabe ein Fehler");
  }
});

// =======================================================================================================
// ============================================ADMIN======================================================
// =======================================================================================================
// @desc    get all orders
// @route   GET api/a1/orders
// @access  private/ADMIN
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "username email");
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400);
    throw new Error("Fehler beim fetchen");
  }
});
