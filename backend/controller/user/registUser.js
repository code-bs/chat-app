/* IMPORTS */
const crypto = require("crypto");
const logger = require("../../config/logger");
const userModel = require("../../models/userModels")();

/* METHODS */
function checkIdDuplication(context) {
  const { userId } = context;

  logger.info(`
[User][registUser]-> check ID duplicaiton
${JSON.stringify(context)}`);

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

function encryptPassword(context) {
  const { password } = context;

  logger.info(`
[User][registUser]-> encrypt password
${JSON.stringify({ ...context, password: "secret :)" })}
`);

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

function checkNickNameDuplication(context) {
  const { nickname } = context;

  logger.info(`
[User][registUser]-> check nickname duplication
${JSON.stringify(context)}`);

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
  logger.info(`
[User][registUser]-> insert new user
${JSON.stringify({ ...context, password: "secret :)", hashCode: "code :)" })}`);
  return new Promise((resolve, reject) => {
    userModel.insertUser(context, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/* EXPORTS */
async function register({ userId, password, nickname }, callback) {
  logger.info(`
[User][registUser]-> start
${{ userId, nickname }}`);

  try {
    await checkIdDuplication({ userId, nickname });
    const { hashCode, ePassword } = await encryptPassword({
      userId,
      password,
      nickname,
    });
    await checkNickNameDuplication({ userId, nickname });
    await insertNewUser({ userId, password: ePassword, nickname, hashCode });

    logger.info(`
[User][registUser]-> done
${JSON.stringify({ userId, nickname })}`);

    callback(null, {
      userId,
      message: "ok",
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
  const { userId, password, nickname } = req.body;
  register({ userId, password, nickname }, (error, payload) => {
    if (error) {
      if (error.status >= 500) {
        logger.error(error.error);
      } else {
        logger.info(`
[User][registUser]-> ${error.status}
${error.message}
${context}`);
      }
      res.status(error.status).send(error.message);
    } else {
      res.send(payload);
    }
  });
};
