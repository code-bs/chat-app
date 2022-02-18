/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "deleteFriend",
};

/* METHODS */
function validateInput(body) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  const { friendId, ...extra } = body;
  return new Promise((resolve, reject) => {
    if (!friendId)
      reject({
        status: 400,
        message: "friendId 가 설정되지 않았습니다.",
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

function checkUserExists(friendId) {
  const moduleInfo = { ...defaultModuleInfo, method: "checkUserExists" };
  return new Promise((resolve, reject) => {
    userModel.searchId(friendId, (err, result) => {
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
          message: "존재하지 않는 유저입니다.",
          ...moduleInfo,
        });
      else resolve();
    });
  });
}

function checkIsFriend(userId, friendId) {
  const moduleInfo = { ...defaultModuleInfo, method: "checkIsFriend" };
  return new Promise((resolve, reject) => {
    userModel.isFriend(userId, friendId, (err, result) => {
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
          message: "친구가 아닙니다.",
          ...moduleInfo,
        });
      else resolve();
    });
  });
}

function delFriend(userId, friendId) {
  const moduleInfo = { ...defaultModuleInfo, method: "delFriend" };
  return new Promise((resolve, reject) => {
    userModel.deleteFriend(userId, friendId, (err) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.user;
  const { friendId } = req.body;
  logger.info(`[User][deleteFriend] ${userId}-${friendId}`);
  try {
    await validateInput(req.body);
    await checkUserExists(friendId);
    await checkIsFriend(userId, friendId);
    await delFriend(userId, friendId);
    logger.info(`[User][deleteFriend] ${userId}-${friendId} DONE`);
    res.send();
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
