const mongoose = require("mongoose");
const logger = require("../logger");

const initializeMongoDB = (context) => {
  const { host, port } = context;
  const url = `mongodb://${host}:${port}`;
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
