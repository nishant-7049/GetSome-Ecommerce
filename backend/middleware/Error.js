const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Mongodb error
  if (err.name === "CastError") {
    const message = "Resource not found " + err.path;
    err = new ErrorHandler(message, 400);
  }

  //duplicate error
  if (err.code === 11000) {
    const message = "Duplicate: " + Object.keys(err.keyValue) + " entered";
    err = new ErrorHandler(message, 400);
  }

  //jsonwebtoken error
  if (err.name == "JsonWebTokenError") {
    const message = "Invalid json web token has aquired, Try again";
    err = new ErrorHandler(message, 400);
  }

  //token expired error
  if (err.name === "TokenExpiredError") {
    const message = "Token has been expired, Try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
