/* IMPORTS */
const crypto = require("crypto");
const logger = require("../../config/logger");
const userModel = require("../../models/userModels")();

/* METHODS */
function checkIdDuplication(userId) {
  logger.info(`[User][registUser]-> check ID duplicaiton`);
  return new Promise((resolve, reject) => {
    userModel.searchId(userId, (err, res) => {
      if (err)
        reject({
          status: 500,
          error: err,
          message: "알 수 없는 에러가 발생하였습니다.",
        });
      if (res.length > 0)
        reject({ status: 400, message: "중복된 아이디 입니다." });
      else {
        resolve();
      }
    });
  });
}

function encryptPassword(password) {
  logger.info(`[User][registUser]-> encrypt password`);
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
              error: err,
              message: "알 수 없는 에러가 발생하였습니다.",
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

function checkNickNameDuplication(nickname) {
  logger.info(`[User][registUser]-> check nickname duplication`);
  return new Promise((resolve, reject) => {
    userModel.searchNickname(nickname, (err, res) => {
      if (err)
        reject({
          status: 500,
          error: err,
          message: "알 수 없는 에러가 발생하였습니다.",
        });
      else {
        if (res.length > 0)
          reject({ status: 400, message: "중복된 닉네임 입니다." });
        else resolve();
      }
    });
  });
}

function insertNewUser(context) {
  logger.info(`[User][registUser]-> insert new user`);
  return new Promise((resolve, reject) => {
    userModel.insertUser(context, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/* EXPORTS */
async function register(context, callback) {
  logger.info(`[User][registUser]-> start`);
  const { userId, password, nickname, avatarUrl, statusMessage } = context;
  try {
    await checkIdDuplication(userId);
    const { hashCode, ePassword } = await encryptPassword(password);
    await checkNickNameDuplication(nickname);
    await insertNewUser({ ...context, password: ePassword, hashCode });
    logger.info(`[User][registUser]-> done`);
    callback(null, {
      userId,
      nickname,
      avatarUrl,
      statusMessage,
    });
  } catch (error) {
    if (!error.status)
      callback(
        {
          status: 500,
          error,
          message: "알 수 없는 오류가 발생하였습니다.",
        },
        null
      );
    else callback(error, null);
  }
}

module.exports = function (req, res) {
  const { userId, password, nickname, avatarUrl, statusMessage } = req.body;

  register(
    { userId, password, nickname, avatarUrl, statusMessage },
    (error, payload) => {
      if (error) {
        if (error.status >= 500) {
          logger.error(error.error);
        } else {
          logger.info(`[User][registUser]-> ${error.status}
${error.message}`);
        }
        res.status(error.status).send(error.message);
      } else {
        res.send(payload);
      }
    }
  );
};
