/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");

/* METHODS */
function checkInviteValid(userId, roomId) {
  logger.info(`[chat][joinRoom]-> check invite valid`);
  return new Promise((resolve, reject) => {
    chatModel.checkInvite(userId, roomId, (error, result) => {
      if (error) reject(error);
      else {
        if (result.length < 1)
          reject({ status: 400, message: "유효하지 않은 초대입니다." });
        else resolve();
      }
    });
  });
}

function joinRoom(userId, roomId) {
  logger.info(`[chat][joinRoom]-> insert to mysql db`);
  return new Promise((resolve, reject) => {
    chatModel.mapRoomList({ userId, roomId }, (error, result) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

function deleteInvite(userId, roomId) {
  logger.info(`[chat][joinRoom]-> delete invite data`);
  return new Promise((resolve, reject) => {
    chatModel.deleteInvite(userId, roomId, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  logger.info(`[chat][joinRoom]-> accepting invitation room`);
  const { userId, roomId } = req.body;
  try {
    await checkInviteValid(userId, roomId);
    await joinRoom(userId, roomId);
    await deleteInvite(userId, roomId);

    logger.info(`[chat][joinRoom]-> join room done`);
    res.end();
  } catch (error) {
    if (!error.status) {
      logger.error(`[chat][joinRoom]-> ${error}`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[chat][joinRoom]-> ${error.status}:${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
