// global imports
import asyncHandler from "express-async-handler";

// import model
import Product from "../models/Product.js";

// @desc    get all Products
// @route   GET api/a1/products
// @access  public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error("Fehler beim fetchen");
  }
});

// @desc    get Product by ID
// @route   GET api/a1/products/:id
// @access  public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Kein Produkt gefunden!");
  }
  res.status(200).json(product);
});

// Admin stuff
// @desc    Create a product
// @route   POST api/a1/products
// @access  Private/ADMIN
export const createProduct = asyncHandler(async (req, res) => {
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

  const product = await Product.create({
    name,
    price,
    image,
    brand,
    desc,
    category,
    countInStock,
    numReviews,
    rating,
    user: req.user.id,
  });

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Erstellen");
  }
});

// @desc    delete a User
// @route   DELETE api/a1/users/:id
// @access  private/ADMIN
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("Kein User gefunden!");
  }
  await user.remove();
  res.status(200).json({ msg: "User wurde gelöscht" });
});

// @desc    update a User
// @route   PUT api/a1/users/:id
// @access  private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("Kein User gefunden!");
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      },
    },
    { new: true }
  ).select("-password");
  res.status(200).json(updatedUser);
});
