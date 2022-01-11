const httpServer = require("./config/initializer/httpServer");
const mongodb = require("./config/initializer/mongodb");
const websocket = require("./config/initializer/websocket");
const logger = require("./config/logger");
const path = require("path");

const runServer = async () => {
  require("dotenv").config({
    path: path.join(__dirname, `./config/env/${process.env.MODE}.env`),
  });
  try {
    await httpServer(process.env.PORT);
    await websocket(process.env.SOCKET_PORT);
    await mongodb({
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
    });
    logger.info(`[CHAT-APP] initialization SUCCESSFULLY!`);
  } catch (error) {
    logger.error(error);
  }
};

runServer();
