/* IMPORTS */
const crypto = require("crypto");
const { resolve } = require("path");
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const userModel = require("../../models/userModels")();
const defaultModuleInfo = {
  module: "auth",
  service: "registUser",
};

/* METHODS */
function validateInput(body) {
  const { userId, password, nickname, avatarUrl, statusMessage, ...extra } =
    body;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject({ ...moduleInfo, status: 400, message: "아이디를 입력하세요." });
    } else if (userId.length < 4 || userId.length > 12) {
      reject({
        ...moduleInfo,
        status: 400,
        message: "아이디는 4자 이상 12자 이하여야 합니다.",
      });
    } else if (!password) {
      reject({ ...moduleInfo, status: 400, message: "비밀번호를 입력하세요." });
    } else if (password.length < 4 || password.length > 12) {
      reject({
        ...moduleInfo,
        status: 400,
        message: "비밀번호는 4자 이상 12자 이하여야 합니다.",
      });
    } else if (!nickname) {
      reject({ ...moduleInfo, status: 400, message: "닉네임을 입력하세요." });
    } else if (nickname.length < 2 || nickname.length > 8) {
      reject({
        ...moduleInfo,
        status: 400,
        message: "닉네임은 2자 이상 8자 이하여야 합니다.",
      });
    } else if (!!Object.keys(extra).length) {
      reject({
        ...moduleInfo,
        status: 400,
        message: "허용되지 않는 입력입니다.",
      });
    } else resolve();
  });
}

function checkIdDuplication(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "checkIdDuplication" };
  return new Promise((resolve, reject) => {
    userModel.searchId(userId, (err, res) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 에러가 발생하였습니다.",
          errorMsg: err,
          ...moduleInfo,
        });
      if (res.length > 0)
        reject({
          status: 400,
          message: "중복된 아이디 입니다.",
          ...moduleInfo,
        });
      else {
        resolve();
      }
    });
  });
}

function encryptPassword(password) {
  const moduleInfo = { ...defaultModuleInfo, method: "encryptPassword" };
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(
        password,
        buf.toString("base64"),
        100000,
        64,
        process.env.HASH_ALGORITHM,
        (err, key) => {
          if (err)
            reject({
              status: 500,
              message: "알 수 없는 오류가 발생하였습니다.",
              errorMsg: err,
              ...moduleInfo,
            });
          resolve({
            hashCode: buf.toString("base64"),
            ePassword: key.toString("base64"),
          });
        }
      );
    });
  });
}

function checkNicknameDuplication(nickname) {
  const moduleInfo = {
    ...defaultModuleInfo,
    method: "checkNicknameDuplication",
  };
  return new Promise((resolve, reject) => {
    userModel.searchNickname(nickname, (err, res) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 에러가 발생하였습니다.",
          errorMsg: err,
          ...moduleInfo,
        });
      else {
        if (res.length > 0)
          reject({
            status: 400,
            message: "중복된 닉네임 입니다.",
            ...moduleInfo,
          });
        else resolve();
      }
    });
  });
}

function insertNewUser(context) {
  const moduleInfo = { ...defaultModuleInfo, method: "insertNewUser" };
  return new Promise((resolve, reject) => {
    userModel.insertUser(context, (err) => {
      if (err)
        reject({
          status: 500,
          message: "알 수 없는 에러가 발생하였습니다.",
          errorMsg: err,
          ...moduleInfo,
        });
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId, password, nickname, avatarUrl, statusMessage } = req.body;
  logger.info(`[Auth][registUser]-> regists new user: ${userId}`);
  try {
    await validateInput(req.body);
    await checkIdDuplication(userId);
    await checkNicknameDuplication(nickname);
    const { hashCode, ePassword } = await encryptPassword(password);
    await insertNewUser({
      userId,
      password: ePassword,
      nickname,
      avatarUrl,
      statusMessage,
      hashCode,
    });
    logger.info(`[Auth][registUser]-> registration done: ${userId}`);
    res.send({
      userId,
      nickname,
      avatarUrl,
      statusMessage,
    });
  } catch (error) {
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
