const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Name of Product"],
  },
  description: {
    type: String,
    required: [true, "please Enter Description of Product"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter price of Product"],
    maxLength: [8, "Length of price is exceded"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, " enter category of product"],
  },
  stock: {
    type: Number,
    required: [true, "Enter Stock number of product"],
    default: 1,
    maxLength: [4, "Only less than 4 characters are allowed in stock"],
  },
  noOfReview: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const product = mongoose.model("products", productSchema);
module.exports = product;
