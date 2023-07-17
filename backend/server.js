const app = require("./app");
const cloudinary = require("cloudinary");

//setting up config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//connecting to mongodb server
const connectMongoose = require("./config/db");

//Shutting down server on uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

connectMongoose();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Giving server a port
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port: ${process.env.PORT}`);
});

//Shutting down server on unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log("Shutting down the server due to Unhandled Rejection");

  server.close(() => {
    process.exit(1);
  });
});
