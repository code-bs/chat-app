// module.exports = async function (req, res) {
//   res.cookie("refreshToken", "").end();
// };

/* IMPORTS */
const authModel = require("../../models/authModels")();
const logger = require("../../config/logger");

/* METHODS */
function insertToBlacklist(refreshToken) {
  logger.info(`[Auth][logout]-> insert into blacklist`);
  return new Promise((resolve, reject) => {
    authModel.insertToBlacklist(refreshToken, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}
/* EXPORTS */
module.exports = async function (req, res) {
  logger.info(`[Auth][logout]-> logout`);
  const { refreshToken } = req.cookies;

  try {
    await insertToBlacklist(refreshToken);

    logger.info(`[Auth][logout]-> logout done`);
    res.end();
  } catch (error) {
    if (!error.status) {
      logger.error(error);
      res.status(500).send("알 수 없는 오류가 발생하였습니다.");
    } else {
      logger.info(`[Auth][logout]-> ${error.status}:${error.message}`);
      res.status(error.status).send(error.message);
    }
  }

  // res.cookie("refreshToken", "").end();
  res.end();
};
