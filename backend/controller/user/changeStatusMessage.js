/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");

/* METHODS */
function updateStatusMessage(userId, message) {
  logger.info(`[User][changeStatusMessage]-> update db`);
  return new Promise((resolve, reject) => {
    userModel.updateStatusMessage(userId, message, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId, statusMessage } = req.body;
  logger.info(`[User][changeStatusMessage]-> change status message`);
  try {
    await updateStatusMessage(userId, statusMessage);

    logger.info(`[User][changeStatusMessage]-> change status message done`);
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
