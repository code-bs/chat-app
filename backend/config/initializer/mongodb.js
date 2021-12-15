const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017";
const logger = require("../logger");

const initializeMongoDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, { useNewUrlParser: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        logger.info(
          `[RunServer][InitiateMongoDB]-> MongoDB Connected Successfully - ${url}`
        );
        resolve();
      }
    });

    mongoose.connection.on("disconnected", () => {
      logger.error(`[RunServer][InitiateMongoDB]-> MongoDB disconnected`);
    });
  });
};

module.exports = initializeMongoDB;
