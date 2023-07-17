const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "backend/config/config.env" });
app.use(cookieParser());

const ErrorHandler = require("./middleware/Error");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
// const cors = require("cors");

const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");

app.use(express.json());
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload({ useTempFiles: true }));

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.use(ErrorHandler);

module.exports = app;
