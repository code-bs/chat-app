const httpServer = require("./config/initializer/httpServer.js");
const mongodb = require("./config/initializer/mongodb");
const websocket = require("./config/initializer/websocket");
const logger = require("./config/logger");

const runServer = async () => {
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
