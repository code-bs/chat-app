/* IMPORTS */
const jwt = require("../common/jwt");
const logger = require("../../config/logger");
const authModel = require("../../models/authModels")();

/* METHODS */
function checkBlacklist(refreshToken) {
  logger.info(`[Auth][refreshToken]-> check blacklist`);
  return new Promise((resolve, reject) => {
    authModel.checkTokenInBlacklist(refreshToken, (error, result) => {
      if (error) reject(error);
      else {
        if (result === "1")
          reject({ status: 404, message: "만료된 세션입니다." });
        else {
          resolve();
        }
      }
    });
  });
}

function verifyToken(refreshToken) {
  logger.info(`[auth][refreshToken]-> verify token`);
  return new Promise((resolve, reject) => {
    jwt
      .validate_refresh(refreshToken)
      .then((payload) => {
        resolve(payload);
      })
      .catch((error) => reject(error));
  });
}

function generateToken(payload) {
  logger.info(`[auth][refreshToken]-> generate new access token`);
  return new Promise((resolve, reject) => {
    jwt
      .generate(payload)
      .then((token) => {
        resolve(token);
      })
      .catch((error) => reject(error));
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { refreshToken } = req.cookies;
  logger.info(`[auth][refreshToken]-> start`);
  try {
    await checkBlacklist(refreshToken);
    const payload = await verifyToken(refreshToken);
    const { userId, nickname, avatarUrl, statusMessage } = payload;
    const accessToken = await generateToken({
      userId,
      nickname,
      avatarUrl,
      statusMessage,
    });

    logger.info(`[auth][refreshToken]-> done`);
    res.send({
      accessToken,
      user: { userId, nickname, avatarUrl, statusMessage },
    });
  } catch (error) {
    if (!error.status) {
      logger.error(error);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[auth][refreshToken]-> ${error.status}:${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
