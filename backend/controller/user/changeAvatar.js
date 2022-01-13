/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");

/* METHODS */
function updateAvatarUrl(userId, url) {
  logger.info(`[User][changeAvatar]-> update db`);
  return new Promise((resolve, reject) => {
    userModel.updateAvatar(userId, url, (error, result) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId, avatarUrl } = req.body;

  logger.info(`[User][changeAvatar]-> change avatar`);
  try {
    await updateAvatarUrl(userId, avatarUrl);

    logger.info(`[User][changeAvatar]-> change avatar done`);
    res.end();
  } catch (error) {
    if (!error.status) {
      logger.error(error);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[User][changeAvatar]-> ${error.status}:${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
