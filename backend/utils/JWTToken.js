const setToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
  };
  res.cookie("token", token, options);
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = setToken;
