const httpServer = require("./config/initializer/httpServer.js");
const mongodb = require("./config/initializer/mongodb");
// const wsServer = require("./config/initializer/wsServer");
const websocket = require("./config/initializer/websocket");

const runServer = async () => {
  try {
    await httpServer();
    // await wsServer();
    await websocket();
    await mongodb();
    console.log("[CHAT-APP] initialization SUCCESSFULLY!");
  } catch (error) {
    throw new Error(error);
  }
};

runServer();
