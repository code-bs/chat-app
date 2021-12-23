const httpServer = require("./config/initializer/httpServer");
const mongodb = require("./config/initializer/mongodb");
const websocket = require("./config/initializer/websocket");
const logger = require("./config/logger");
const path = require("path");

const runServer = async () => {
  require("dotenv").config({
    path: path.join(__dirname, "./config/env/local.env"),
  });
  try {
    await httpServer();
    await websocket();
    await mongodb();
    logger.info(`[CHAT-APP] initialization SUCCESSFULLY!`);
  } catch (error) {
    logger.error(error);
  }
};

runServer();
