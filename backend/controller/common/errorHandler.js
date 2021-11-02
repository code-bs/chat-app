const logger = require("../../config/logger");

function ErrorHandler(err) {
  this.res.status(err.statusCode || 500);
  const response = new Object();
  if (err.statusCode) {
    logger.error(`[${err.controller}]-> ${err.message}`);
    delete err.statusCode;
    delete err.controller;
    response.err = err;
    res.jsonp(response);
  } else {
    logger.error(`Server Error`);
    response.err = "Server Error";
    res.jsonp(response);
  }
}

module.exports = ErrorHandler;
