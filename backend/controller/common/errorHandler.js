function ErrorHandler(err) {
  this.res.status(err.statusCode || 500);
  const response = {};
  response.err = err;
  response.err.message = err.message ? err.message : err;

  res.jsonp(response);
}

module.exports = ErrorHandler;
