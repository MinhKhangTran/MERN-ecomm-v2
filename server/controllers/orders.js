// global imports
import asyncHandler from "express-async-handler";

// import model
import Order from "../models/Order.js";

// @desc    Create new order
// @route   POST api/a1/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Kein Produkt gefunden!");
  }
  // check if the user already reviewed
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );
    if (!alreadyReviewed) {
      const review = {
        name: req.user.username,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        user: req.user.id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((total, item) => item.rating + total, 0) /
        product.reviews.length;
      // saven
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(400);
      throw new Error("Du diese Produkt schon reviewed");
    }
  }
});

// @desc    get Order by ID
// @route   GET api/a1/orders/:id
// @access  private
export const getOrderById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Kein Produkt gefunden!");
  }
  res.status(200).json(product);
});

// @desc    get Order from logged User
// @route   GET api/a1/orders/myorders
// @access  private
export const getMyOrders = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Kein Produkt gefunden!");
  }
  res.status(200).json(product);
});

// @desc    update a order to paid
// @route   PUT api/a1/products/:id/pay
// @access  private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    desc,
    category,
    countInStock,
    numReviews,
    rating,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Kein Produkt gefunden!");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        price,
        image,
        brand,
        desc,
        category,
        countInStock,
        numReviews,
        rating,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedProduct);
});

// =======================================================================================================
// ============================================ADMIN======================================================
// =======================================================================================================
// @desc    get all orders
// @route   GET api/a1/orders
// @access  private/ADMIN
export const getAllOrders = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("Fehler beim fetchen");
  }
});

// @desc    update a order to delivered
// @route   PUT api/a1/products/:id/deliver
// @access  private/ADMIN
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    desc,
    category,
    countInStock,
    numReviews,
    rating,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Kein Produkt gefunden!");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        price,
        image,
        brand,
        desc,
        category,
        countInStock,
        numReviews,
        rating,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedProduct);
});
