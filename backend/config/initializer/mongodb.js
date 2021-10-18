const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const url = "localhost:27017";

const initializeMongoDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, { useNewUrlParser: true }, (err) => {
      if (err) {
        reject("[RunServer][InitiateMongoDB]->MongoDB Connection Error");
      }
      console.log(
        "[RunServer][InitiateMongoDB]-> MongoDB Connected Successfully"
      );
    });

    mongoose.connection.on("disconnected", () => {
      console.log("[RunServer][InitiateMongoDB]-> MongoDB Disconnected");
    });

    resolve();
  });
};

module.exports = initializeMongoDB;
