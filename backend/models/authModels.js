let Model = function () {
  const _mysql = require("../config/initializer/mysqldb");

  this.getUser = (id, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member WHERE userId=?",
        [id],
        (error, result) => {
          if (error) done(error, null);
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
