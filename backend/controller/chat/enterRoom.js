/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "chat",
  service: "enterRoom",
};

/* METHODS */
function validateInput(params) {
  const { roomId, ...extra } = params;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!roomId)
      reject({
        status: 400,
        message: "roomId가 설정되지 않았습니다.",
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

function getChatHistory(roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getChatHistory" };
  return new Promise((resolve, reject) => {
    if (!roomId)
      reject({
        status: 400,
        message: "방이 선택되지 않았습니다.",
        ...moduleInfo,
      });
    else {
      chatModel.getChatHistory(roomId, (error, result) => {
        if (error)
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
    }
  });
}

function getUsers(roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getUsers" };
  return new Promise((resolve, reject) => {
    chatModel.getUsers(roomId, (err, result) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else resolve(result);
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { roomId } = req.params;
  logger.info(`[Chat][enterRoom]-> entering room to ${roomId}`);
  try {
    await validateInput(req.params);
    const { chatHistory } = await getChatHistory(roomId);
    const users = await getUsers(roomId);
    logger.info(`[Chat][enterRoom]-> enter room complete! ${roomId}}`);
    res.send({ users, chatHistory });
  } catch (error) {
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
