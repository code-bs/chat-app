/**
 * MySQL pool. Singleton 패턴 구현
 * 참고자료: https://velog.io/@gwon713/Nodejs-MySQL-DB-connection-pool
 */

const mysql = require("mysql");

const connection = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
  connectionLimit: 300,
};

let pool = mysql.createPool(connection);

function getConnection(done) {
  pool.getConnection(function (err, conn) {
    if (err) console.error(err);
    else {
      done(conn);
    }
  });
}
module.exports = getConnection;
