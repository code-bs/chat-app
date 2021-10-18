const httpServer = require("./config/initializer/httpServer.js");
const mongodb = require("./config/initializer/mongodb");

const runServer = async () => {
  try {
    await httpServer();
    await mongodb();
  } catch (error) {
    throw new Error(error);
  }
};

runServer();
