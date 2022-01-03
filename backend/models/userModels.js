let Model = function () {
  const _mysql = require("../config/initializer/mysqldb");

  this.searchId = (id, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member where userId=?",
        [id],
        (err, result) => {
          if (err) done(err, null);
          else {
            done(null, result);
          }
        }
      );
      conn.release();
    });
  };

  this.searchNickname = (nickName, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member where nickName=?",
        [nickName],
        (err, result) => {
          if (err) done(err, null);
          else {
            done(null, result);
          }
        }
      );
      conn.release();
    });
  };

  this.insertUser = (context, done) => {
    const { userId, password, nickName, hashCode } = context;
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_member (userId, password, nickName, hashCode) VALUES (?, ?, ?, ?)",
        [userId, password, nickName, hashCode],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  this.searchIdBySubstr = (substr, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT userSeqno, userId, nickName FROM tbl_member WHERE userId LIKE ?; ",
        [substr],
        (error, result) => {
          if (error) done(error, null);
          else {
            done(null, result);
          }
        }
      );
      conn.release();
    });
  };

  this.addFriend = (userSeqno, friendSeqno, done) => {
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_map_friend (userSeqno, friendSeqno) VALUES(?, ?)",
        [userSeqno, friendSeqno],
        (error) => {
          if (error) done(error);
          else done(null);
        }
      );
    });
  };

  this.getFriendList = (userSeqno, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT m.userSeqno, m.userId, m.nickName FROM tbl_map_friend as f INNER JOIN tbl_member as m ON m.userSeqno=f.friendSeqno WHERE f.userSeqno=?",
        [userSeqno],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };

  this.isFriend = (userSeqno, friendSeqno, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_map_friend WHERE userSeqno=? AND friendSeqno=?",
        [userSeqno, friendSeqno],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
    });
  };
};

module.exports = function () {
  return new Model();
};
