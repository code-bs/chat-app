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

  this.searchNickname = (nickname, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_member where nickname=?",
        [nickname],
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
    const { userId, password, nickname, hashCode, avatarUrl, statusMessage } =
      context;
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_member (userId, password, nickname, hashCode, avatarUrl, statusMessage) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, password, nickname, hashCode, avatarUrl, statusMessage],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  this.getUserInfo = (userId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT userId, nickname, avatarUrl, statusMessage FROM tbl_member WHERE userId=?",
        [userId],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };
  this.searchIdBySubstr = (substr, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT userId, nickname, avatarUrl, statusMessage FROM tbl_member WHERE userId LIKE ?; ",
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

  this.addFriend = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_map_friend (userId, friendId) VALUES(?, ?)",
        [userId, friendId],
        (error) => {
          if (error) done(error);
          else done(null);
        }
      );
    });
  };

  this.getFriendList = (userId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT m.userId, m.nickname, m.avatarUrl, m.statusMessage FROM tbl_map_friend as f INNER JOIN tbl_member as m ON m.userId=f.friendId WHERE f.userId=?",
        [userId],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };

  this.isFriend = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT _id FROM tbl_map_friend WHERE userId=? AND friendId=?",
        [userId, friendId],
        (error, result) => {
          if (error) done(error, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };

  /* 친구 요청 관련 */
  this.invite = (userId, targetId, done) => {
    _mysql((conn) => {
      conn.query(
        "INSERT INTO tbl_invite_friend (userId, targetId) VALUES(?, ?)",
        [targetId, userId],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  this.checkInvite = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT * FROM tbl_invite_friend WHERE userId=? AND targetId=?",
        [userId, friendId],
        (err, result) => {
          if (err) done(err, null);
          else done(null, result);
        }
      );
    });
  };

  this.getFriendReqs = (userId, done) => {
    _mysql((conn) => {
      conn.query(
        "SELECT m.userId, m.nickName, m.avatarUrl, m.statusMessage FROM tbl_invite_friend as f INNER JOIN tbl_member as m ON f.targetId=m.userId WHERE f.userId=?",
        [userId],
        (err, result) => {
          if (err) done(err, null);
          else done(null, result);
        }
      );
      conn.release();
    });
  };

  this.deleteInvite = (userId, friendId, done) => {
    _mysql((conn) => {
      conn.query(
        "DELETE FROM tbl_invite_friend WHERE userId=? AND targetId=?",
        [userId, friendId],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };

  this.updateProfile = (userId, profile, done) => {
    const { nickname, avatarUrl, statusMessage } = profile;
    _mysql((conn) => {
      conn.query(
        "UPDATE tbl_member SET nickname=?, avatarUrl=?, statusMessage=? WHERE userID=?",
        [nickname, avatarUrl, statusMessage, userId],
        (err) => {
          if (err) done(err);
          else done(null);
        }
      );
      conn.release();
    });
  };
};

module.exports = function () {
  return new Model();
};
