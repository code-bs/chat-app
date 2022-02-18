/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "getReceivedReq",
};

/* METHODS */
function getFriendReqs(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getFriendReqs" };
  return new Promise((resolve, reject) => {
    userModel.getFriendReqs(userId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.user;
  logger.info(`[user][checkRequest] ${userId}`);
  try {
    const reqList = await getFriendReqs(userId);

    logger.info(`[user][checkRequest] ${userId} DONE`);
    res.send(reqList);
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
