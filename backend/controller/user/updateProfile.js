/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "updateProfile",
};

/* METHODS */
function validateInput(body) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  const { nickname, avatarUrl, statusMessage, ...extra } = body;
  return new Promise((resolve, reject) => {
    if (!nickname || !avatarUrl || !statusMessage)
      reject({
        status: 400,
        message: "올바르지 않은 전송 양식입니다.",
        ...moduleInfo,
      });
    else if (!!Object.keys(extra).length)
      reject({
        status: 400,
        message: "유효하지 않은 입력값입니다.",
        ...moduleInfo,
      });
    else resolve();
  });
}

function checkUserExists(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "checkUserExists" };
  return new Promise((resolve, reject) => {
    userModel.searchId(userId, (error, result) => {
      if (error)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: error,
          ...moduleInfo,
        });
      else {
        if (result.length < 1) {
          reject({
            status: 400,
            message: "존재하지 않는 유저입니다.",
            ...moduleInfo,
          });
        } else resolve();
      }
    });
  });
}

function updateProfile(userId, profile) {
  const moduleInfo = { ...defaultModuleInfo, method: "updateProfile" };
  return new Promise((resolve, reject) => {
    userModel.updateProfile(userId, profile, (error) => {
      if (error)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: error,
          ...moduleInfo,
        });
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.user;
  const { nickname, avatarUrl, statusMessage } = req.body;
  logger.info(`[User][updateProfile] ${userId}`);
  try {
    await validateInput(req.body);
    await checkUserExists(userId);
    await updateProfile(userId, { nickname, avatarUrl, statusMessage });

    logger.info(`[User][updateProfile] ${userId} DONE`);
    res.end();
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
