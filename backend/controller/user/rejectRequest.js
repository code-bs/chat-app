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
  const { senderId, ...extra } = body;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!senderId)
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

function validateReq(senderId, userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "validateReq" };
  return new Promise((resolve, reject) => {
    userModel.checkInvite(senderId, userId, (err, result) => {
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

function changeReqStatus(senderId, userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "changeReqStatus" };
  return new Promise((resolve, reject) => {
    userModel.rejectInvite(senderId, userId, (err) => {
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
  const { userId } = req.user;
  const { senderId } = req.body;
  logger.info(`[User][rejectRequest] ${senderId}->${userId}`);
  try {
    await validateInput(req.body);
    await validateReq(senderId, userId);
    await changeReqStatus(senderId, userId);
    logger.info(`[User][rejectRequest] ${senderId}->${userId} DONE`);
    res.end();
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
