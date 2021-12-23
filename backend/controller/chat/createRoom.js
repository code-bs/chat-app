/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");

/* METHODS */
function insertRoom(context) {
  return new Promise((resolve, reject) => {
    const { roomName, userId } = context;
    if (!roomName)
      reject({ status: 400, message: "방 이름은 필수 입력 항목입니다." });
    else if (!userId)
      reject({ status: 400, message: "방장이 설정되지 않았습니다." });
    else {
      logger.info(`
[Chat][createRoom]-> insert into mongodb
${JSON.stringify(context)}`);
      chatModel.createRoom(roomName, userId, (error, result) => {
        if (error) reject(error);
        else {
          const { _id } = result;
          resolve(_id);
        }
      });
    }
  });
}

/* EXPORTS */
async function createRoom(context, callback) {
  logger.info(`
[Chat][createRoom]-> creating room
${JSON.stringify(context)}`);
  try {
    const _id = await insertRoom(context);
    logger.info(`
[Chat][createRoom]-> creating room completed
${JSON.stringify(context)}`);
    callback(null, { _id, message: "방 생성 완료" });
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
  const { userId, roomName } = req.body;
  createRoom({ userId, roomName }, (error, payload) => {
    if (error) {
      if (error.status >= 500) {
        logger.error(error.error);
      } else {
        logger.info(`
[Chat][createRoom]-> ${error.status}
${JSON.stringify({ userId, roomName })}
${error.message}`);
      }
      res.status(error.status).send(error.message);
    } else {
      res.send(payload);
    }
  });
};
