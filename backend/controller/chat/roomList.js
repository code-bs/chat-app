/* IMPORTS */
const chatModel = require("../../models/chatModels")();
const logger = require("../../config/logger");

/* METHODS */
function getRoomInfos(userId) {
  logger.info(`[Chat][roomList]-> get rooms info from mongo`);
  return new Promise((resolve, reject) => {
    chatModel.getRoomInfos(userId, (err, result) => {
      if (err) reject(err);
      else {
        console.log(result);
        resolve(result);
      }
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.params;
  try {
    const roomInfos = await getRoomInfos(userId);

    logger.info(`[Chat][roomList]-> get room list done`);
    res.send(roomInfos);
  } catch (error) {
    if (!error.status) {
      console.error(error);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      res.status(error.status).send(error.message);
    }
  }
};
