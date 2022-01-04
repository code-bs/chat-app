/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");

/* METHODS */
function findUser(context) {
  const { userId, friendId } = context;
  logger.info(`[User][addFriend][${userId}/${friendId}]-> check friend exists`);
  return new Promise((resolve, reject) => {
    userModel.searchId(friendId, (error, result) => {
      if (error) reject(error);

      if (result.length < 1)
        reject({ status: 400, message: "존재하지 않는 사용자 입니다." });
      else {
        resolve();
      }
    });
  });
}

function isFriend(context) {
  const { userId, friendId } = context;
  logger.info(`[User][addFriend][${userId}/${friendId}]-> isFriend`);

  return new Promise((resolve, reject) => {
    userModel.isFriend(userId, friendId, (error, result) => {
      if (error) reject(error);

      if (result.length > 0)
        reject({ status: 400, message: "이미 친구 입니다." });
      else {
        resolve();
      }
    });
  });
}

function insertFriend(context) {
  const { userId, friendId } = context;
  logger.info(`[User][addFriend][${userId}/${friendId}]-> adding friend`);
  return new Promise((resolve, reject) => {
    userModel.addFriend(userId, friendId, (error) => {
      if (error) reject(error);

      userModel.addFriend(friendId, userId, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  });
}

module.exports = async function (req, res) {
  const { userId, friendId } = req.body;

  logger.info(`[User][addFriend][${userId}/${friendId}]-> new friend`);

  try {
    await findUser({ userId, friendId });
    await isFriend({ userId, friendId });
    await insertFriend({ userId, friendId });

    logger.info(`[User][addFriend][${userId}/${friendId}]-> add friend done`);
    res.send();
  } catch (error) {
    if (!error.status) {
      logger.error(`[User][addFriend][${userId}/${friendId}]
${error}
`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[User][addFriend][${userId}/${friendId}]-> STATUS: ${error.status}
${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
