const express = require("express");
const router = express.Router();

const {
  sendStripeApiKey,
  processPayment,
} = require("../controllers/PaymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/payment/apiKey").get(sendStripeApiKey);

module.exports = router;
