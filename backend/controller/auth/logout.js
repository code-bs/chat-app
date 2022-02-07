// module.exports = async function (req, res) {
//   res.cookie("refreshToken", "").end();
// };

/* IMPORTS */
const authModel = require("../../models/authModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "auth",
  service: "logout",
};

/* METHODS */
function insertToBlacklist(refreshToken) {
  const moduleInfo = { ...defaultModuleInfo, method: "insertToBlacklist" };
  logger.info(`[Auth][logout]-> insert into blacklist`);
  return new Promise((resolve, reject) => {
    authModel.insertToBlacklist(refreshToken, (error) => {
      if (error)
        reject({
          ...moduleInfo,
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errorMsg: error,
        });
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
    errorHandler(error);
    res.status(error.status).send(error.message);
  }
};
