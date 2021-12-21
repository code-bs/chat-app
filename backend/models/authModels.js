let Model = function () {
  const _mysql = require("../config/initializer/mysqldb");

  this.getUser = (id, done) => {
    console.log("[AuthModel][getUser]", id);
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member WHERE userId=?",
        [id],
        (err, result) => {
          if (err) done(err, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };
};

module.exports = function () {
  return new Model();
};
