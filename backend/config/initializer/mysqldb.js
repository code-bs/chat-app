/**
 * MySQL pool. Singleton 패턴 구현
 * 참고자료: https://velog.io/@gwon713/Nodejs-MySQL-DB-connection-pool
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../env/local.env") });

const mysql = require("mysql");

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_USER);

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
