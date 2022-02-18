/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");
const defaultModuleInfo = {
  module: "chat",
  service: "roomList",
};

/* METHODS */
function getRoomIds(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getRoomIds" };
  return new Promise((resolve, reject) => {
    chatModel.getRoomIds(userId, (err, result) => {
      if (err)
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
    chatModel.getRoomInfo(roomId, (err, result) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: error,
          ...moduleInfo,
        });
      else resolve(result);
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.user;
  logger.info(`[Chat][roomList]${userId}`);
  try {
    const roomIds = await getRoomIds(userId);
    let roomInfos = [];
    for (let i = 0; i < roomIds.length; i++) {
      let roomInfo = await getRoomInfo(roomIds[i].roomId);
      roomInfos.push(roomInfo);
    }
    logger.info(`[Chat][roomList]${userId} DONE`);
    res.send(roomInfos);
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
