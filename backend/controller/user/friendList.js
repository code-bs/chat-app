/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");

/* METHODS */
function getFriendList(userId) {
  logger.info(`[User][friendList][${userId}]-> get friend list`);
  return new Promise((resolve, reject) => {
    userModel.getFriendList(userId, (error, result) => {
      if (error) reject(error);
      else {
        resolve(result);
      }
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.params;
  try {
    const friendList = await getFriendList(userId);

    logger.info(`[User][friendList][${userId}]-> get friend list done`);

    res.send(friendList);
  } catch (error) {
    if (!error.status) {
      logger.error(`
[User][friendList][${userId}]
${error}`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`
[User][addFriend][${userId}]-> STATUS: ${error.status}
${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
