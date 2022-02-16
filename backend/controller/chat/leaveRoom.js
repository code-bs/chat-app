/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "chat",
  service: "leaveRoom",
};

/* METHODS */
function validateInput(body) {
  const { userId, roomId, ...extra } = body;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!userId)
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

function validateRequest(userId, roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateRequest" };
  return new Promise((resolve, reject) => {
    chatModel.checkUserInRoom(userId, roomId, (err, result) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else {
        if (result.length < 1) {
          reject({
            status: 400,
            message: `${userId} 는 해당 방에 존재하지 않습니다.`,
            ...moduleInfo,
          });
        } else resolve();
      }
    });
  });
}

function delUserInRoom(userId, roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "leaveRoom" };
  return new Promise((resolve, reject) => {
    chatModel.delUserInMongo(roomId, userId, (err) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else {
        chatModel.delUserInMysql(roomId, userId, (err) => {
          if (err)
            reject({
              status: 500,
              message: "알 수 없는 오류가 발생하였습니다.",
              errMsg: err,
              ...moduleInfo,
            });
          else resolve();
        });
      }
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId, roomId } = req.body;
  try {
    await validateInput(req.body);
    await validateRequest(userId, roomId);
    await delUserInRoom(userId, roomId);

    res.end();
  } catch (error) {
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
