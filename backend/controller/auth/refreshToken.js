/* IMPORTS */
const jwt = require("../common/jwt");
const logger = require("../../config/logger");

/* METHODS */
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
    const payload = await verifyToken(refreshToken);
    const { userId, nickname, avatarUrl, statusMessage } = payload;
    const accessToken = await generateToken({
      userId,
      nickname,
      avatarUrl,
      statusMessage,
    });

    logger.info(`[auth][refreshToken]-> done`);
    res.send({ accessToken });
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
