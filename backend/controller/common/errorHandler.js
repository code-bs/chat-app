const logger = require("../../config/logger");
module.exports = function (err) {
  if (err.status >= 500) {
    logger.error(JSON.stringify(err));
  } else if (!err.status) {
    logger.error(err);
  } else {
    logger.info(JSON.stringify(err));
  }
};
