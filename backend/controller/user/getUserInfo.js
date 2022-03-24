const logger = require("../../config/logger");
const userModel = require("../../models/userModels")();
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "getUserInfo",
};

function searchByTargetId(targetId) {
  const moduleInfo = { ...defaultModuleInfo, method: "searchByTargetId" };
  return new Promise((resolve, reject) => {
    userModel.searchId(targetId, (err, result) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else if (result.length < 1)
        reject({
          status: 400,
          message: "존재하지 않는 사용자입니다.",
          ...moduleInfo,
        });
      else resolve(result[0]);
    });
  });
}

module.exports = async function (req, res) {
  const { targetId } = req.params;
  logger.info(`[User][getUserInfo] ${targetId}`);
  try {
    const { userId, nickname, avatarUrl, statusMessage } =
      await searchByTargetId(targetId);
    logger.info(`[User][getUserInfo] ${targetId} DONE`);
    res.send({ userId, nickname, avatarUrl, statusMessage });
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
