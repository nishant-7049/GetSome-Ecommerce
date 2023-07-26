const catchAsyncError = require("../middleware/catchAsyncFunc");
const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const setToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myForm = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: "150",
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myForm.public_id,
      url: myForm.secure_url,
    },
  });
  setToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  setToken(user, 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "You Logged Our successfully",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorHandler(`User with mail:${req.body.email} not found`, 404)
    );
  }

  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // for production
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  //for development
  // const resetPasswordUrl = `http://localhost:5173/password/reset/${resetToken}`;

  const message = `If you want to reset your password of GetSome than click on link below \n\n ${resetPasswordUrl} \n\n If you haven't requested for reset password link than kindly ignore the email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "GetSome Reset Password Link",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("invalid token or link has expired", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.newPassword;
  user.resetPasswordTime = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  setToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const IsMatched = user.checkPassword(req.body.oldPassword);

  if (!IsMatched) {
    console.log("Old Password does not match");
    return next(new ErrorHandler("Old Password does not match", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    console.log("new password and confirm password does not match");
    return next(
      new ErrorHandler("new password and confirm password does not match", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  setToken(user, 200, res);
});

exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
  const userDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: "150",
      crop: "scale",
    });
    userDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, userDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User with ${req.params.id} not found`, 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const userDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, userDetails);

  if (!user) {
    return next(new ErrorHandler(`User with ${user.params.id} not found`, 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User with ${user.params.id} not found`, 404));
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  res.status(200).json({
    success: true,
    message: "user has been deleted",
  });
});
