// global imports
import express from "express";
// controllers
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createReview,
  getTopProducts,
} from "../controllers/products.js";

// validator
import { runValidation } from "../validators/index.js";
import {
  createProductAdminValidator,
  updateProductAdminValidator,
  reviewValidator,
} from "../validators/productValidator.js";
// authMiddleware
import { protect } from "../middlewares/authMiddleware.js";
// roles
import { grantAccess } from "../middlewares/roleMiddleware.js";

// init route
const router = express.Router();

// get all products,create a product ADMIN
router
  .route("/")
  .get(getAllProducts)
  .post(
    protect,
    createProductAdminValidator,
    runValidation,
    grantAccess("createAny", "products"),
    createProduct
  );
// get top 3
router.route("/top").get(getTopProducts);
// get,delete,update single product
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, grantAccess("deleteAny", "products"), deleteProduct)
  .put(
    protect,
    updateProductAdminValidator,
    runValidation,
    grantAccess("updateAny", "products"),
    updateProduct
  );

// review
router
  .route("/:id/reviews")
  .post(protect, reviewValidator, runValidation, createReview);

export default router;
