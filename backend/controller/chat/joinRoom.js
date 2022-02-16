/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "chat",
  service: "joinRoom",
};

/* METHODS */
function validateInput(body) {
  const { user, roomId, ...extra } = body;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!user)
      reject({
        status: 400,
        message: "userId가 설정되지 않았습니다.",
        ...moduleInfo,
      });
    else if (!roomId)
      reject({
        status: 400,
        message: "roomId가 설정되지 않았습니다.",
        ...moduleInfo,
      });
    else if (!!Object.keys(extra).length)
      reject({
        status: 400,
        message: "유효하지 않는 입력값입니다.",
        ...moduleInfo,
      });
    else resolve();
  });
}

function checkInviteValid(userId, roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "checkInviteValid" };
  return new Promise((resolve, reject) => {
    chatModel.checkInvite(userId, roomId, (error, result) => {
      if (error) reject(error);
      else {
        if (result.length < 1)
          reject({
            status: 400,
            message: "유효하지 않은 초대입니다.",
            ...moduleInfo,
          });
        else resolve();
      }
    });
  });
}

function joinRoom(user, roomId) {
  return new Promise((resolve, reject) => {
    chatModel.mapRoomList({ userId: user.userId, roomId }, (error, result) => {
      if (error)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: error,
          ...moduleInfo,
        });
      else {
        chatModel.newUser(roomId, user, (error) => {
          if (error)
            reject({
              status: 500,
              message: "알 수 없는 오류가 발생하였습니다.",
              errMsg: error,
              ...moduleInfo,
            });
          else resolve();
        });
      }
    });
  });
}

function deleteInvite(userId, roomId) {
  return new Promise((resolve, reject) => {
    chatModel.deleteInvite(userId, roomId, (error) => {
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
  const { user, roomId } = req.body;
  logger.info(
    `[chat][joinRoom]-> ${user.userId} accepting invitation ${roomId}`
  );
  try {
    await validateInput(req.body);
    await checkInviteValid(user.userId, roomId);
    await joinRoom(user, roomId);
    await deleteInvite(user.userId, roomId);

    logger.info(`[chat][joinRoom]-> ${user.userId} join ${roomId} done`);
    res.end();
  } catch (error) {
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
