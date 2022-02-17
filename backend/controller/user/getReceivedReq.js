/* IMPORTS */
const logger = require("../../config/logger");
const userModel = require("../../models/userModels")();

/* METHODS */
function getFriendReqs(userId) {
  logger.info(`[user][checkRequest]-> get from mysql db`);
  return new Promise((resolve, reject) => {
    userModel.getFriendReqs(userId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.params;
  logger.info(`[user][checkRequest]-> get friend req list`);
  try {
    const reqList = await getFriendReqs(userId);

    logger.info(`[user][checkRequest]-> get friend req list done`);
    res.send(reqList);
  } catch (error) {
    if (!error.status) {
      logger.error(`[user][checkRequest]-> ${error}`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[user][checkRequest]-> ${error.status}:${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
