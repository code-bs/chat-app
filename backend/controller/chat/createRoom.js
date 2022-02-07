/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "chat",
  service: "createRoom",
};
/* METHODS */
function validateInput(body) {
  const { userId, roomName, ...extra } = body;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!userId)
      reject({
        status: 400,
        message: "유효하지 않는 입력값입니다.",
        ...moduleInfo,
      });
    else if (!roomName)
      reject({
        status: 400,
        message: "방 이름을 입력하세요.",
        ...moduleInfo,
      });
    else if (roomName.length > 20 || roomName.length < 4)
      reject({
        status: 400,
        message: "방 이름은 4자 이상 20자 이하여야 합니다.",
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

function insertRoom(context) {
  return new Promise((resolve, reject) => {
    const { roomName, userId } = context;
    if (!roomName)
      reject({ status: 400, message: "방 이름은 필수 입력 항목입니다." });
    else if (!userId)
      reject({ status: 400, message: "방장이 설정되지 않았습니다." });
    else {
      logger.info(`[Chat][createRoom]-> insert into mongodb`);
      chatModel.createRoom(roomName, userId, (error, result) => {
        if (error) reject(error);
        else {
          resolve(result);
        }
      });
    }
  });
}

function mapRoomList(context) {
  logger.info(`[Chat][createRoom]-> mapping (mysql)`);
  return new Promise((resolve, reject) => {
    chatModel.mapRoomList(context, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId, roomName } = req.body;

  try {
    const room = await insertRoom({ userId, roomName });
    const roomId = Object(room._id).toString();
    await mapRoomList({ userId, roomId });

    logger.info(`[Chat][createRoom]-> create room done`);
    res.send(room);
  } catch (error) {
    logger.error(`[Chat][createRoom]-> ${error}`);
    if (!error.status)
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    else {
      res.status(error.status).send(error.message);
    }
  }
};
