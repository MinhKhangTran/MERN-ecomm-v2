// global imports
import express from "express";
// controllers
import {
  getAllProducts,
  getProductById,
  createProduct,
} from "../controllers/products.js";

// validator
import { runValidation } from "../validators/index.js";
import { createProductAdminValidator } from "../validators/productValidator.js";
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
// get,delete,update single product
router.route("/:id").get(getProductById);
//   .delete(protect, grantAccess("deleteAny", "profile"), deleteUser)
//   .put(
//     protect,
//     updateUserAdminValidator,
//     runValidation,
//     grantAccess("updateAny", "profile"),
//     updateUser
//   );

export default router;
