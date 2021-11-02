const httpServer = require("./config/initializer/httpServer.js");
const mongodb = require("./config/initializer/mongodb");
// const wsServer = require("./config/initializer/wsServer");
const websocket = require("./config/initializer/websocket");
const logger = require("./config/logger");

const runServer = async () => {
  try {
    await httpServer();
    // await wsServer();
    await websocket();
    await mongodb();
    // console.log("[CHAT-APP] initialization SUCCESSFULLY!");
    logger.info(`[CHAT-APP] initialization SUCCESSFULLY!`);
  } catch (error) {
    logger.error(error);
  }
};

runServer();
