const http = require("http"),
  createError = require("http-errors"),
  port = process.env.PORT || "3000",
  express = require("express");
// cookieParser = require("cookie-parser"),
// bodyParser = require("body-parser");

const app = express();
const indexRouter = require("../config/routes/indexRoute.js"),
  chatRouter = require("../config/routes/chatRoute.js");

const initiateHttpServer = () => {
  return new Promise((resolve, reject) => {
    // app.use(cookieParser());
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/", indexRouter);
    app.use("/chat", chatRouter);

    app.use((req, res, next) => {
      next(createError(404));
    });

    http.createServer(app).listen(port);

    console.log(
      "[RunServer][InitiateHttpServer]-> HTTP Server listening on",
      port
    );
    resolve();
  });
};

module.exports = initiateHttpServer;
