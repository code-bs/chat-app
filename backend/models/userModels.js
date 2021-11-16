const UserSchema = require("./schemas/user");
let Model = function (config) {};
module.exports = function (config) {
  return new Model(config);
};
