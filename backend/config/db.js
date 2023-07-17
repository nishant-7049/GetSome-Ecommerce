const mongoose = require("mongoose");

const connectMongoose = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("Mongoose is connected to server: " + data.connection.host);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectMongoose;
