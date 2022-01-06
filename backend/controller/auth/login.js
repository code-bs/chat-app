/* IMPORTS */
const crypto = require("crypto");
const authModel = require("../../models/authModels")();
const logger = require("../../config/logger");
const jwt = require("../common/jwt");

/* METHODS */
function getUserById(context) {
  const { userId } = context;
  return new Promise((resolve, reject) => {
    logger.info(`[Auth][Login][${userId}]-> checking id validation`);
    authModel.getUser(userId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.length < 1) {
          reject({ status: 400, message: "존재하지 않는 아이디 입니다." });
        } else {
          resolve(result[0]);
        }
      }
    });
  });
}

function validatePassword(context, dbUserInfo) {
  const { userId, password } = context;
  return new Promise((resolve, reject) => {
    logger.info(`[Auth][Login][${userId}]-> checking password validation`);
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
          reject({ status: 400, message: "비밀번호가 틀렸습니다." });
        }
      }
    );
  });
}

function getAccessToken(context) {
  logger.info(`[Auth][Login][${context.userId}]-> generating token`);
  return new Promise((resolve, reject) => {
    jwt
      .generate(context)
      .then((token) => {
        resolve(token);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getRefreshToken(context) {
  logger.info(`[Auth][Login][${context.userId}]-> generating refresh token`);
  return new Promise((resolve, reject) => {
    jwt
      .generate_refresh(context)
      .then((token) => {
        resolve(token);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/* EXPORTS */
async function login(context, callback) {
  logger.info(`[Auth][Login][${context.userId}]-> loggin in`);

  try {
    const dbUserInfo = await getUserById(context);
    await validatePassword(context, dbUserInfo);

    logger.info(`[Auth][Login][${context.userId}]-> login success`);

    const { userId, nickname, avatarUrl, statusMessage } = dbUserInfo;
    const token = await getAccessToken({
      userId,
      nickname,
      avatarUrl,
      statusMessage,
    });
    const refreshToken = await getRefreshToken({
      userId,
      nickname,
      avatarUrl,
      statusMessage,
    });

    callback(null, {
      user: {
        userId,
        nickname,
        avatarUrl,
        statusMessage,
      },
      accessToken: token,
      refreshToken,
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
  const context = req.body;
  login(context, (error, payload) => {
    if (error) {
      if (error.status >= 500) {
        logger.error(error.error);
      } else {
        logger.info(`
[Auth][Login][${context.userId}]-> STATUS: ${error.status}
${error.message}`);
      }
      res.status(error.status).send(error.message);
    } else {
      const { user, accessToken, refreshToken } = payload;
      res.cookie("refreshToken", refreshToken).send({ user, accessToken });
    }
  });
};
