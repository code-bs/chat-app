/* IMPORTS */
const jwt = require("../common/jwt");
const logger = require("../../config/logger");
const authModel = require("../../models/authModels")();
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "auth",
  service: "refreshToken",
};

/* METHODS */
function checkBlacklist(refreshToken) {
  const moduleInfo = { ...defaultModuleInfo, method: "checkBlacklist" };
  return new Promise((resolve, reject) => {
    authModel.checkTokenInBlacklist(refreshToken, (error, result) => {
      if (error)
        reject({
          ...moduleInfo,
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errorMsg: error,
        });
      else {
        if (result === "1")
          reject({ status: 404, message: "만료된 세션입니다.", ...moduleInfo });
        else {
          resolve();
        }
      }
    });
  });
}

function verifyToken(refreshToken) {
  const moduleInfo = { ...defaultModuleInfo, method: "verifyToken" };
  return new Promise((resolve, reject) => {
    jwt
      .validate_refresh(refreshToken)
      .then((payload) => {
        resolve(payload);
      })
      .catch((error) =>
        reject({
          ...moduleInfo,
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errorMsg: error,
        })
      );
  });
}

function getUserInfo(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getUserInfo" };
  return new Promise((resolve, reject) => {
    authModel.getUser(userId, (err, result) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: err,
          ...moduleInfo,
        });
      else if (result.length < 1)
        reject({ status: 400, message: "존재하지 않는 userId", ...moduleInfo });
      else resolve(result[0]);
    });
  });
}

function generateToken(payload) {
  const moduleInfo = { ...defaultModuleInfo, method: "generateToken" };
  return new Promise((resolve, reject) => {
    jwt
      .generate(payload)
      .then((token) => {
        resolve(token);
      })
      .catch((error) =>
        reject({
          ...moduleInfo,
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errorMsg: error,
        })
      );
  });
}

function generateRefresh(payload) {
  const moduleInfo = { ...defaultModuleInfo, method: "generateRefresh" };
  return new Promise((resolve, reject) => {
    jwt
      .generate_refresh(payload)
      .then((token) => {
        resolve(token);
      })
      .catch((error) => {
        reject({
          ...moduleInfo,
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errorMsg: error,
        });
      });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { refreshToken } = req.cookies;
  logger.info(`[auth][refreshToken]-> start`);
  try {
    await checkBlacklist(refreshToken);
    const payload = await verifyToken(refreshToken);
    const { userId } = payload;
    const {
      userId: id,
      nickname,
      avatarUrl,
      statusMessage,
    } = await getUserInfo(userId);
    const accessToken = await generateToken({
      userId: id,
      nickname,
      avatarUrl,
      statusMessage,
    });
    const newRefresh = await generateRefresh({
      userId: id,
      nickname,
      avatarUrl,
      statusMessage,
    });

    logger.info(`[auth][refreshToken]-> done`);
    res.cookie("refreshToken", newRefresh).send({
      accessToken,
      user: { userId: id, nickname, avatarUrl, statusMessage },
    });
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
