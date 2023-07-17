const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createReview,
  getProductReviews,
  deleteProductReview,
  getAdminProducts,
} = require("../controllers/ProductController");
const router = express.Router();

router.route("/product").get(getAllProducts);
router
  .route("/product/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteProductReview);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
module.exports = router;
