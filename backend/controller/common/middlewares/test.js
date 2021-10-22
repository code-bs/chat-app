function test(req, res, next) {
  console.log("This is Middleware Function");
  next();
}

module.exports = function () {
  return test;
};
