/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");
const defaultModuleInfo = {
  module: "chat",
  service: "roomList",
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
  const { userId } = req.params;
  logger.info(`[Chat][roomList]-> ${userId} getting roomlist`);
  try {
    await validateInput(req.params);
    const roomIds = await getRoomIds(userId);
    let roomInfos = [];
    for (let i = 0; i < roomIds.length; i++) {
      let roomInfo = await getRoomInfo(roomIds[i].roomId);
      roomInfos.push(roomInfo);
    }
    logger.info(`[Chat][roomList]-> ${userId} got roomlist (DONE)`);
    res.send(roomInfos);
  } catch (error) {
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
