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

function insertRoom(roomName, userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "insertRoom" };
  return new Promise((resolve, reject) => {
    chatModel.createRoom(roomName, userId, (error, result) => {
      if (error)
        reject({
          status: 500,
          errMsg: error,
          message: "알 수 없는 오류가 발생하였습니다.",
          ...moduleInfo,
        });
      else {
        resolve(result);
      }
    });
  });
}

function mapRoomList(context) {
  const moduleInfo = { ...defaultModuleInfo, method: "mapRoomList" };
  return new Promise((resolve, reject) => {
    chatModel.mapRoomList(context, (error) => {
      if (error)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: error,
          ...moduleInfo,
        });
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId, roomName } = req.body;
  logger.info(`[Chat][createRoom]-> creating ${roomName}`);
  try {
    await validateInput(req.body);
    const room = await insertRoom(roomName, userId);
    const roomId = Object(room._id).toString();
    await mapRoomList({ userId, roomId });

    logger.info(`[Chat][createRoom]-> creating ${roomName} done`);
    res.send(room);
  } catch (error) {
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
