/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");

/* METHODS */
function getChatHistory(roomId) {
  logger.info(`[Chat][enterRoom][${roomId}]-> getting room info`);
  return new Promise((resolve, reject) => {
    if (!roomId) reject({ status: 400, message: "방이 선택되지 않았습니다." });
    else {
      chatModel.getChatHistory(roomId, (error, result) => {
        if (error) reject(error);
        else {
          resolve(result);
        }
      });
    }
  });
}

function getUsers(roomId) {
  logger.info(`[Chat][enterRoom][${roomId}]-> getting users`);
  return new Promise((resolve, reject) => {
    chatModel.getUsers(roomId, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/* EXPORTS */
async function enterRoom(params, callback) {
  const { roomId } = params;
  logger.info(`[Chat][enterRoom][${roomId}]-> entering room`);
  try {
    const { chatHistory } = await getChatHistory(roomId);
    const users = await getUsers(roomId);

    logger.info(`[Chat][enterRoom][${roomId}]-> entering room completed`);
    callback(null, {
      users,
      chatHistory,
    });
  } catch (error) {
    if (!error.status)
      callback(
        {
          status: 500,
          error,
          message: "알 수 없는 오류가 발생하였습니다.",
        },
        null
      );
    else callback(error, null);
  }
}

module.exports = function (req, res) {
  const params = req.params;
  enterRoom(params, (error, payload) => {
    if (error) {
      if (error.status >= 500) {
        logger.error(error.error);
      } else {
        logger.info(`
[Chat][enterRoom]-> ${error.status}
${error.message}
${params.roomId}`);
      }
      res.status(error.status).send(error.message);
    } else {
      res.jsonp(payload);
    }
  });
};
