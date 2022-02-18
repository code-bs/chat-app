/* IMPORTS */
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const chatModel = require("../../models/chatModels")();
const defaultModuleInfo = {
  module: "chat",
  service: "deleteInvite",
};

/* METHODS */
function validateInput(body) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  const { senderId, roomId, ...extra } = body;
  return new Promise((resolve, reject) => {
    if (!senderId)
      reject({
        status: 400,
        message: "senderId 설정되지 않았습니다.",
        ...moduleInfo,
      });
    else if (!roomId)
      reject({
        status: 400,
        message: "roomId가 설정되지 않았습니다.",
        ...moduleInfo,
      });
    else if (!!Object.keys(extra).length)
      reject({
        status: 400,
        message: "올바르지 않는 입력값입니다.",
        ...moduleInfo,
      });
    else resolve();
  });
}

function validateReq(senderId, userId, roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateReq" };
  return new Promise((resolve, reject) => {
    chatModel.checkInvite(senderId, userId, roomId, (err, result) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else if (result.length < 1)
        reject({
          status: 400,
          message: "존재하지 않는 요청입니다.",
          ...moduleInfo,
        });
      else {
        resolve();
      }
    });
  });
}

function delInvite(senderId, userId, roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "delInvite" };
  return new Promise((resolve, reject) => {
    chatModel.deleteInvite(senderId, userId, roomId, (err) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else resolve();
    });
  });
}

module.exports = async function (req, res) {
  const { userId } = req.user;
  const { senderId, roomId } = req.body;
  logger.info(`[Chat][deleteInvite]-> ${senderId}->${userId}: ${roomId}`);
  try {
    await validateInput(req.body);
    await validateReq(senderId, userId, roomId);
    await delInvite(senderId, userId, roomId);

    logger.info(
      `[Chat][deleteInvite]-> ${senderId}->${userId}: ${roomId} DONE!`
    );
    res.end();
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
