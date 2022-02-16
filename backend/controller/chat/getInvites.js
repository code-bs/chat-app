/* IMPORTS */
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const chatModel = require("../../models/chatModels")();
const defaultModuleInfo = {
  module: "chat",
  service: "getInvites",
};

/* METHODS */
function validateInput(params) {
  const { userId, ...extra } = params;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!userId)
      reject({
        status: 400,
        message: "userId가 설정되지 않았습니다.",
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
function getInvites(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getInvites" };
  return new Promise((resolve, reject) => {
    chatModel.getRoomInvites(userId, (error, result) => {
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

function getRoomInfo(roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getRoomInfo" };
  return new Promise((resolve, reject) => {
    chatModel.getRoomInfo(roomId, (error, result) => {
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
  const { userId } = req.params;
  logger.info(`[chat][getInvites]-> ${userId}: get invites`);
  try {
    await validateInput(req.params);
    const roomIds = await getInvites(userId);
    let roomInfos = [];
    for (let i = 0; i < roomIds.length; i++) {
      const { userId, nickname, avatarUrl, statusMessage, roomId } = roomIds[i];
      const roomInfo = await getRoomInfo(roomId);

      roomInfos.push({
        sender: { userId, nickname, avatarUrl, statusMessage },
        room: roomInfo,
      });
    }
    logger.info(`[chat][getInvites]-> ${userId}: get invites done`);
    res.send(roomInfos);
  } catch (error) {
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
