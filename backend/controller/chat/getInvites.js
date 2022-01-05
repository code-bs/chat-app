/* IMPORTS */
const logger = require("../../config/logger");
const chatModel = require("../../models/chatModels")();

/* METHODS */
function getInvites(userId) {
  logger.info(`[chat][getInvites]-> get invites from mysql db`);
  return new Promise((resolve, reject) => {
    chatModel.getRoomInvites(userId, (error, result) => {
      if (error) reject(error);
      else {
        resolve(result);
      }
    });
  });
}

function getRoomInfo(roomId) {
  logger.info(`[chat][getInvites]-> get room info`);
  return new Promise((resolve, reject) => {
    chatModel.getRoomInfo(roomId, (error, result) => {
      if (error) reject(error);
      else {
        resolve(result);
      }
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.params;
  logger.info(`[chat][getInvites]-> get invites`);

  try {
    const roomIds = await getInvites(userId);
    let roomInfos = [];
    for (let i = 0; i < roomIds.length; i++) {
      let roomId = roomIds[i].roomId;
      const roomInfo = await getRoomInfo(roomId);
      roomInfos.push(roomInfo);
    }
    logger.info(`[chat][getInvites]-> get invites done`);
    res.send(roomInfos);
  } catch (error) {
    if (!error.status) {
      logger.error(`[chat][getInvites]-> ${error}`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[chat][getInvites]-> ${error.status}:${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
