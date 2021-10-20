const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = "mongodb://localhost:27017";

const initializeMongoDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, { useNewUrlParser: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(
          "[RunServer][InitiateMongoDB]-> MongoDB Connected Successfully"
        );
        resolve();
      }
    });

    // mongoose.connection.on("disconnected", () => {
    //   console.log("[RunServer][InitiateMongoDB]-> MongoDB Disconnected");
    // });
  });
};

module.exports = initializeMongoDB;
