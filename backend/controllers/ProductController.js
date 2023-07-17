const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/ApiFeatures");
const catchAsyncFunc = require("../middleware/catchAsyncFunc");
const cloudinary = require("cloudinary");

exports.createProduct = catchAsyncFunc(async (req, res) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const myCloud = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncFunc(async (req, res) => {
  const productPerPage = 6;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product, req.query).Search().Filter();
  let product = await apiFeatures.query;
  let filteredProductCount = product.length;
  const apiFeatures2 = new ApiFeatures(Product, req.query)
    .Search()
    .Filter()
    .Pagination(productPerPage);

  product = await apiFeatures2.query;
  res.status(200).json({
    success: true,
    product,
    productsCount,
    productPerPage,
    filteredProductCount,
  });
});

exports.getAdminProducts = catchAsyncFunc(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

exports.getProductDetails = catchAsyncFunc(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncFunc(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  if (req.body.images) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    let imagesLinks = [];
    for (let i = 0; i < req.body.images.length; i++) {
      const myCloud = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncFunc(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product has been deleted",
  });
});

exports.createReview = catchAsyncFunc(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.noOfReview = product.reviews.length;
  }

  let totalOfRatings = 0;
  product.reviews.forEach((rev) => {
    totalOfRatings += rev.rating;
  });

  product.ratings = totalOfRatings / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getProductReviews = catchAsyncFunc(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(
      new ErrorHandler(`Product with ${req.query.id} not found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteProductReview = catchAsyncFunc(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(
      new ErrorHandler(`Product with ${req.query.ProductId} not found`, 400)
    );
  }

  const reviews = product.reviews.filter(
    (rev) => rev.user.toString() !== req.user._id.toString()
  );
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings;
  if (reviews.length == 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const noOfReview = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, noOfReview },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    message: "Review has been deleted successfully.",
  });
});
