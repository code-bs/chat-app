/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "getSentReq",
};

/* METHODS */
function getSentRequests(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getSentRequests" };
  return new Promise((resolve, reject) => {
    userModel.getFriendSentReqs(userId, (err, result) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else {
        resolve(result);
      }
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.user;
  logger.info(`[User][getSentReq] ${userId}`);
  try {
    const results = await getSentRequests(userId);

    logger.info(`[User][getSentReq]-> ${userId}: DONE!!`);
    res.send(results);
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
