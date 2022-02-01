/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");

/* METHODS */
function checkUserExists(userId) {
  logger.info(`[User][updateProfile]-> check user exists`);
  return new Promise((resolve, reject) => {
    userModel.searchId(userId, (error, result) => {
      if (error) reject(error);
      else {
        if (result.length < 1) {
          reject({ status: 400, message: "존재하지 않는 유저입니다." });
        } else resolve();
      }
    });
  });
}
function updateProfile(userId, profile) {
  logger.info(`[User][updateProfile]-> update db`);
  return new Promise((resolve, reject) => {
    userModel.updateProfile(userId, profile, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId, profile } = req.body;
  logger.info(`[User][updateProfile]-> change status message`);
  try {
    await checkUserExists(userId);
    await updateProfile(userId, profile);

    logger.info(`[User][updateProfile]-> change status message done`);
    res.end();
  } catch (error) {
    if (!error.status) {
      logger.error(error);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[User][updateProfile]-> ${error.status}:${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
