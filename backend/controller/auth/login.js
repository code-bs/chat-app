/* IMPORTS */
const crypto = require("crypto");
const authModel = require("../../models/authModels")();
const errorHandler = require("../common/errorHandler");
const logger = require("../../config/logger");
const jwt = require("../common/jwt");
const defaultModuleInfo = {
  module: "auth",
  service: "login",
};

/* METHODS */
function validateInput(body) {
  return new Promise((resolve, reject) => {
    const { userId, password, ...extra } = body;
    const moduleInfos = { ...defaultModuleInfo, method: "validateInput" };
    if (!userId) {
      reject({
        status: 400,
        message: "아이디를 입력하세요.",
        ...moduleInfos,
      });
    } else if (!password) {
      reject({
        status: 400,
        message: "비밀번호를 입력하세요.",
        ...moduleInfos,
      });
    } else if (!!Object.keys(extra).length) {
      reject({
        status: 400,
        message: "허용되지 않은 입력입니다.",
        ...moduleInfos,
      });
    } else {
      resolve();
    }
  });
}

function getUserById(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "getUserById" };
  return new Promise((resolve, reject) => {
    authModel.getUser(userId, (error, result) => {
      if (error) {
        reject({
          ...moduleInfo,
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errorMsg: error,
        });
      } else {
        if (result.length < 1) {
          reject({
            status: 400,
            message: "존재하지 않는 아이디 입니다.",
            ...defaultError,
          });
        } else {
          resolve(result[0]);
        }
      }
    });
  });
}

function validatePassword(password, dbUserInfo) {
  const moduleInfo = { ...defaultModuleInfo, method: "validatePassword" };
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      dbUserInfo.hashCode,
      100000,
      64,
      process.env.HASH_ALGORITHM,
      (err, key) => {
        if (key.toString("base64") === dbUserInfo.password) {
          resolve();
        } else {
          reject({
            status: 400,
            message: "비밀번호가 틀렸습니다.",
            ...moduleInfo,
          });
        }
      }
    );
  });
}

function getAccessToken(context) {
  const moduleInfo = { ...defaultModuleInfo, method: "getAccessToken" };
  return new Promise((resolve, reject) => {
    jwt
      .generate(context)
      .then((token) => {
        resolve(token);
      })
      .catch((error) => {
        reject({
          ...moduleInfo,
          status: 500,
          message: error,
        });
      });
  });
}

function getRefreshToken(context) {
  const moduleInfo = { ...defaultModuleInfo, method: "getAccessToken" };
  return new Promise((resolve, reject) => {
    jwt
      .generate_refresh(context)
      .then((token) => {
        resolve(token);
      })
      .catch((error) => {
        reject({
          ...moduleInfo,
          status: 500,
          message: error,
        });
      });
  });
}

module.exports = async function (req, res) {
  const { userId, password } = req.body;

  logger.info(`[Auth][Login] ${userId}: loggin in`);
  try {
    await validateInput(req.body);
    const dbUserInfo = await getUserById(userId);
    await validatePassword(password, dbUserInfo);
    const { id, nickname, avatarUrl, statusMessage } = dbUserInfo;
    const accessToken = await getAccessToken({
      userId: id,
      nickname,
      avatarUrl,
      statusMessage,
    });
    const refreshToken = await getRefreshToken({
      userId: id,
      nickname,
      avatarUrl,
      statusMessage,
    });

    logger.info(`[Auth][Login] ${userId}: login success`);
    res.cookie("refreshToken", refreshToken).send({
      user: {
        userId: id,
        nickname,
        avatarUrl,
        statusMessage,
      },
      accessToken,
    });
  } catch (error) {
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
