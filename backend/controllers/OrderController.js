const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncFunc");

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderedItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderedItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    PaidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.singleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    next(new ErrorHandler(`Order with id: ${req.params.id} not found.`, 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order with id not found", 400));
  }

  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler(
        `Order with id: ${req.parama.id} has already delivered`,
        400
      )
    );
  }
  if (order.orderStatus === "Shipped") {
    order.orderedItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;
  if (order.orderStatus == "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order with id: ${req.params.id} not found`, 404)
    );
  }
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order is successfully deleted.",
  });
});
