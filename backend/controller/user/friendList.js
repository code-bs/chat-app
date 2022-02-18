/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "friendList",
};

/* METHODS */
function getFriendList(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getFriendList" };
  return new Promise((resolve, reject) => {
    userModel.getFriendList(userId, (error, result) => {
      if (error)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: error,
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
  logger.info(`[User][friendList] ${userId}`);
  try {
    const friendList = await getFriendList(userId);
    logger.info(`[User][friendList] ${userId} DONE`);

    res.send(friendList);
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
