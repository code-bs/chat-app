/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");

/* METHODS */
function getRooms() {
  logger.info(`[Chat][roomList]-> getting room list`);
  return new Promise((resolve, reject) => {
    chatModel.findAllChatRoom((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

/* EXPORTS */
async function roomList(callback) {
  logger.info(`[Chat][roomList]-> start to get room list`);
  try {
    const rooms = await getRooms();

    logger.info(`[Chat][roomList]-> completed to get room list`);
    callback(null, {
      rooms,
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
  roomList((error, payload) => {
    if (error) {
      if (error.status >= 500) {
        logger.error(error.error);
      } else {
        logger.info(`
[Chat][roomList]-> ${error.status}
${error.message}`);
      }
      res.status(error.status).send(error.message);
    } else {
      res.jsonp(payload);
    }
  });
};
