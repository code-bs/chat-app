/* IMPORTS */
const userModel = require("../../models/userModels")();
const logger = require("../../config/logger");
const errorHandler = require("../common/errorHandler");
const defaultModuleInfo = {
  module: "user",
  service: "searchUsers",
};

/* METHODS */
function validateInput(query) {
  const { userId, ...extra } = query;
  const moduleInfo = { ...defaultModuleInfo, method: "validateInput" };
  return new Promise((resolve, reject) => {
    if (!userId)
      reject({
        status: 400,
        message: "userId가 설정되지 않았습니다.",
        ...moduleInfo,
      });
    else if (userId.length < 3)
      reject({
        status: 400,
        message: "3자 이상 입력하세요.",
        ...moduleInfo,
      });
    else if (!!Object.keys(extra).length)
      reject({
        status: 400,
        message: "유효하지 않는 입력값입니다.",
        ...moduleInfo,
      });
    else resolve();
  });
}

function searchByIdSubstr(userId) {
  const moduleInfo = { ...defaultModuleInfo, method: "searchByIdSubstr" };
  return new Promise((resolve, reject) => {
    let substr = ["%", userId, "%"].join("");
    userModel.searchIdBySubstr(substr, (error, result) => {
      if (error)
        reject({
          status: 500,
          message: "알 수 없는 오류가 발생하였습니다.",
          errMsg: error,
          ...moduleInfo,
        });
      else resolve(result);
    });
  });
}

/* EXPORTS */
module.exports = async function (req, res) {
  const { userId } = req.query;
  logger.info(`[User][searchUser] ${userId}`);
  try {
    await validateInput(req.query);
    const searchResult = await searchByIdSubstr(userId);

    logger.info(`[User][searchUser] ${userId} DONE`);
    res.send(searchResult);
  } catch (error) {
    errorHandler(error);
    res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
};
