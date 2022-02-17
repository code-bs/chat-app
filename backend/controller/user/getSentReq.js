/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "getSentReq",
};

/* METHODS */
function validateInput(params) {
  const { userId, ...extra } = params;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject({
        status: 400,
        message: "userId가 설정되지 않았습니다.",
        ...moduleInfo,
      });
    } else if (!!Object.keys(extra).length) {
      reject({
        status: 400,
        message: "유효하지 않는 입력값입니다.",
        ...moduleInfo,
      });
    } else resolve();
  });
}

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
  const { userId } = req.params;
  logger.info(`[User][getSentReq]-> ${userId} getting sent friend requests`);
  try {
    await validateInput(req.params);
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
