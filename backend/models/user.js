const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name"],
    maxLength: [30, "Name cannot exeed 30 characters"],
    minLength: [4, "Name atleast contain 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter valid email"],
    unique: [true, "This email is already registered"],
  },
  password: {
    type: String,
    required: [true, "Please enter Password"],
    minLength: [8, "Password should contain atleast 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: [true],
    },
    url: {
      type: String,
      required: [true],
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//encrypting password before saving model
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// generating token to store in cookie
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//to check password matches entered password or not
userSchema.methods.checkPassword = async function (enteredPassword) {
  const data = await bcrypt.compare(enteredPassword, this.password);
  return data;
};

//generating ressetPasswordToken
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTime = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
const user = mongoose.model("users", userSchema);
module.exports = user;
