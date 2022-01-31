const logger = require("../../config/logger");
const userModel = require("../../models/userModels")();

function getUserInfo(userId) {
  return new Promise((resolve, reject) => {
    userModel.getUserInfo(userId, (error, result) => {
      if (error) reject(error);
      else {
        if (result.length == 0) {
          reject({ status: 400, message: "존재하지 않는 사용자 입니다." });
        } else {
          const { userId, nickname, avatarUrl, statusMessage } = result[0];
          resolve({ userId, nickname, avatarUrl, statusMessage });
        }
      }
    });
  });
}

module.exports = async function (req, res) {
  logger.info("[User][getUser]-> Get One User Info");

  const { userId } = req.params;
  try {
    const payload = await getUserInfo(userId);

    logger.info("[User][getUser]-> done");
    res.send(payload);
  } catch (error) {
    if (!error.status) {
      logger.error(`[User][getUser]-> ${error}`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[User][getUser]-> ${error.status}:${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
