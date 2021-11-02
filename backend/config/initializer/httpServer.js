const http = require("http"),
  createError = require("http-errors"),
  port = process.env.PORT || "3000",
  express = require("express"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  logger = require("../logger"),
  { swaggerUi, specs } = require("../swagger");

const app = express();
const indexRouter = require("../routes/indexRoute.js"),
  chatRouter = require("../routes/chatRoute.js");

const initiateHttpServer = () => {
  return new Promise((resolve, reject) => {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    app.use("/", indexRouter);

    // app.use("/chat", app.test);
    app.use("/chat", chatRouter);

    app.use((req, res, next) => {
      next(createError(404));
    });

    http.createServer(app).listen(port);

    logger.info(
      `[RunServer][InitiateHttpServer]-> HTTP Server listening on ${port}`
    );
    resolve();
  });
};

module.exports = initiateHttpServer;
