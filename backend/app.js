const httpServer = require("./config/initializer/httpServer.js");
const mongodb = require("./config/initializer/mongodb");

const runServer = async () => {
  try {
    await httpServer();
    await mongodb();
    console.log("[CHAT-APP] initialization SUCCESSFULLY!");
  } catch (error) {
    throw new Error(error);
  }
};

runServer();
