/* IMPORTS */
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const chatModel = require("../../models/chatModels")();
const defaultModuleInfo = {
  module: "chat",
  service: "rejectInvite",
};

/* METHODS */
function validateInput(body) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  const { userId, targetId, roomId, ...extra } = body;
  return new Promise((resolve, reject) => {
    if (!userId)
      reject({
        status: 400,
        message: "userId가 설정되지 않았습니다.",
        ...moduleInfo,
      });
    else if (!targetId)
      reject({
        status: 400,
        message: "targetId가 설정되지 않았습니다.",
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

function validateReq(userId, targetId, roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateReq" };
  return new Promise((resolve, reject) => {
    chatModel.checkInvite(userId, targetId, roomId, (err, result) => {
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
          message: "유효하지 않는 요청입니다.",
          ...moduleInfo,
        });
      else {
        resolve();
      }
    });
  });
}

function changeReqStatus(userId, targetId, roomId) {
  const moduleInfo = { ...defaultModuleInfo, method: "changeReqStatus" };
  return new Promise((resolve, reject) => {
    chatModel.updateInvite(userId, targetId, roomId, (err) => {
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

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId, targetId, roomId } = req.body;
  logger.info(`[User][rejectInvite]-> ${userId}->${targetId}:${roomId}`);
  try {
    await validateInput(req.body);
    await validateReq(userId, targetId, roomId);
    await changeReqStatus(userId, targetId, roomId);

    logger.info(
      `[User][rejectInvite]-> ${userId}->${targetId}:${roomId} DONE!`
    );
    res.end();
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
