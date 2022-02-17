/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "rejectRequest",
};

/* METHODS */
function validateInput(body) {
  const { userId, targetId, ...extra } = body;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
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
    else if (!!Object.keys(extra).length) {
      reject({
        status: 400,
        message: "유효하지 않는 입력값입니다.",
      });
    } else resolve();
  });
}

function validateReq(userId, targetId) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateReq" };
  return new Promise((resolve, reject) => {
    userModel.checkInvite(userId, targetId, (err, result) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else if (result.length < 1) {
        reject({
          status: 400,
          message: "존재하지 않는 요청입니다.",
          ...moduleInfo,
        });
      } else resolve();
    });
  });
}

function changeReqStatus(userId, targetId) {
  const moduleInfo = { ...defaultModuleInfo, method: "changeReqStatus" };
  return new Promise((resolve, reject) => {
    userModel.rejectInvite(userId, targetId, (err) => {
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
  const { userId, targetId } = req.body;
  logger.info(`[User][rejectRequest]-> ${userId}->${targetId}`);
  try {
    await validateInput(req.body);
    await validateReq(userId, targetId);
    await changeReqStatus(userId, targetId);
    logger.info(`[User][rejectRequest]-> ${userId}->${targetId} DONE!`);
    res.end();
  } catch (error) {
    errorHandler(error);
    res.status(error.status || 500).send(error.message);
  }
};
