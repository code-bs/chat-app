/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");

/* METHODS */
function getFriendList(userSeqno) {
  logger.info(`[User][friendList][${userSeqno}]-> get friend list`);
  return new Promise((resolve, reject) => {
    userModel.getFriendList(userSeqno, (error, result) => {
      if (error) reject(error);
      else {
        resolve(result);
      }
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userSeqno } = req.params;
  try {
    const friendList = await getFriendList(userSeqno);

    logger.info(`[User][friendList][${userSeqno}]-> get friend list done`);

    res.send(friendList);
  } catch (error) {
    if (!error.status) {
      logger.error(`
[User][friendList][${userSeqno}]
${error}`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`
[User][addFriend][${userSeqno}]-> STATUS: ${error.status}
${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
