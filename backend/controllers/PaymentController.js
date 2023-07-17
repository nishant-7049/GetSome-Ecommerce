const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../middleware/catchAsyncFunc");

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "GetSome",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});
exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  const stripeApiKey = process.env.STRIPE_API_KEY;
  res.status(200).json({
    success: true,
    stripeApiKey,
  });
});
