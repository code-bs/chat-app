/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");

/* METHODS */
function getRoomIds(userId) {
  logger.info(`[Chat][roomList]-> get rooms info from mysql`);
  return new Promise((resolve, reject) => {
    chatModel.getRoomIds(userId, (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
}

function getRoomInfo(roomId) {
  return new Promise((resolve, reject) => {
    chatModel.getRoomInfo(roomId, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.params;
  try {
    const roomIds = await getRoomIds(userId);
    let roomInfos = [];
    for (let i = 0; i < roomIds.length; i++) {
      let roomInfo = await getRoomInfo(roomIds[i].roomId);
      roomInfos.push(roomInfo);
    }

    logger.info(`[Chat][roomList]-> get room list done`);
    res.send(roomInfos);
  } catch (error) {
    if (!error.status) {
      console.error(error);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      res.status(error.status).send(error.message);
    }
  }
};
