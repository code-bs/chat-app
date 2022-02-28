/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");

/* METHODS */
function checkValidReq(userId, friendId) {
  return new Promise((resolve, reject) => {
    userModel.checkInvite(userId, friendId, (error, result) => {
      if (error) reject(error);

      if (!result || result.length < 1)
        reject({ status: 400, message: "유효하지 않은 요청입니다." });
      else resolve();
    });
  });
}

function findUser(friendId) {
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

function isFriend(userId, friendId) {
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

function insertFriend(userId, friendId) {
  return new Promise((resolve, reject) => {
    userModel.addFriend(userId, friendId, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

function deleteInvite(senderId, userId) {
  return new Promise((resolve, reject) => {
    userModel.deleteInvite(senderId, userId, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

module.exports = async function (req, res) {
  const { userId } = req.user;
  const { senderId } = req.body;
  logger.info(`[User][addFriend] ${senderId}`);
  try {
    await checkValidReq(senderId, userId);
    await findUser(senderId);
    await isFriend(userId, senderId);
    await insertFriend(userId, senderId);
    await insertFriend(senderId, userId);
    await deleteInvite(senderId, userId);

    logger.info(`[User][addFriend] ${senderId} DONE`);
    res.send();
  } catch (error) {
    if (!error.status) {
      logger.error(`[User][addFriend]
${error}
`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[User][addFriend]-> STATUS: ${error.status}
${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
