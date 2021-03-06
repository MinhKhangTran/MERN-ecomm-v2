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

// @desc    Create a review
// @route   POST api/a1/products/:id/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res) => {
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

// =======================================================================================================
// ============================================ADMIN======================================================
// =======================================================================================================
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

// @desc    delete a Product
// @route   DELETE api/a1/products/:id
// @access  private/ADMIN
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Kein Produkt gefunden!");
  }
  await product.remove();
  res.status(200).json({ msg: "Produkt wurde gelöscht" });
});

// @desc    update a Product
// @route   PUT api/a1/products/:id
// @access  private
export const updateProduct = asyncHandler(async (req, res) => {
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
