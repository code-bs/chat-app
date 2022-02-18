/* IMPORTS */
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const chatModel = require("../../models/chatModels")();
const defaultModuleInfo = {
  module: "chat",
  service: "getReceivedInvites",
};

/* METHODS */
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
  const { userId } = req.user;
  logger.info(`[chat][getInvites]${userId}`);
  try {
    const roomIds = await getInvites(userId);
    let roomInfos = [];
    for (let i = 0; i < roomIds.length; i++) {
      const { userId, nickname, avatarUrl, statusMessage, roomId, curStatus } =
        roomIds[i];
      const roomInfo = await getRoomInfo(roomId);

      roomInfos.push({
        sender: { userId, nickname, avatarUrl, statusMessage },
        room: roomInfo,
        curStatus,
      });
    }
    logger.info(`[chat][getInvites]${userId} DONE`);
    res.send(roomInfos);
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
