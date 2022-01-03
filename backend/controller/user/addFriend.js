/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");

/* METHODS */
function findUser(context) {
  const { userSeqno, friendId } = context;
  logger.info(
    `[User][addFriend][${userSeqno}/${friendId}]-> check friend exists`
  );
  return new Promise((resolve, reject) => {
    userModel.searchId(friendId, (error, result) => {
      if (error) reject(error);

      if (result.length < 1)
        reject({ status: 400, message: "존재하지 않는 사용자 입니다." });
      else {
        resolve(result[0]);
      }
    });
  });
}

function isFriend(context) {
  const { userSeqno, friendSeqno, friendId } = context;
  logger.info(`[User][addFriend][${userSeqno}/${friendId}]-> isFriend`);

  return new Promise((resolve, reject) => {
    userModel.isFriend(userSeqno, friendSeqno, (error, result) => {
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
  const { userSeqno, friendSeqno, friendId } = context;
  logger.info(`[User][addFriend][${userSeqno}/${friendId}]-> adding friend`);
  return new Promise((resolve, reject) => {
    userModel.addFriend(userSeqno, friendSeqno, (error) => {
      if (error) reject(error);

      userModel.addFriend(friendSeqno, userSeqno, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  });
}

module.exports = async function (req, res) {
  const { userSeqno, friendId } = req.body;

  logger.info(`[User][addFriend][${userSeqno}/${friendId}]-> new friend`);

  try {
    const result = await findUser({ userSeqno, friendId });
    const friendSeqno = result.userSeqno;
    await isFriend({ userSeqno, friendSeqno, friendId });
    await insertFriend({ userSeqno, friendSeqno, friendId });

    logger.info(
      `[User][addFriend][${userSeqno}/${friendId}]-> add friend done`
    );
    res.send();
  } catch (error) {
    if (!error.status) {
      logger.error(`
[User][addFriend][${userSeqno}/${friendId}]
${error}
`);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`
[User][addFriend][${userSeqno}/${friendId}]-> STATUS: ${error.status}
${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
