/* IMPORTS */
const logger = require("../../config/logger");
const userModel = require("../../models/userModels")();

function searchByIdSubstr(userId) {
  logger.info(`[User][findUser][${userId}]-> searching user in db`);
  return new Promise((resolve, reject) => {
    let substr = ["%", userId, "%"].join("");
    userModel.searchIdBySubstr(substr, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

module.exports = async function (req, res) {
  const { userId } = req.params;
  try {
    const searchResult = await searchByIdSubstr(userId);

    logger.info(`[User][findUser][${userId}]-> searching completed`);
    res.send(searchResult);
  } catch (error) {
    if (!error.status) {
      logger.error(`
[User][findUser][${userId}]->
${error}`);
      res.status(500).send("알 수 없는 에러가 발생하였습니다.");
    } else {
      logger.info(`
[User][findUser][${userId}]-> STATUS: ${error.status}
${error.message}`);
      res.status(error.status).send(error.message);
    }
  }
};
