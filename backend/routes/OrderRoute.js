const express = require("express");
const {
  createOrder,
  singleOrder,
  myOrders,
  allOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/OrderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, createOrder);

router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), singleOrder)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, deleteOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

module.exports = router;
