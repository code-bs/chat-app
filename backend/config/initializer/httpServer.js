const http = require("http"),
  createError = require("http-errors"),
  express = require("express"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  logger = require("../logger");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const swaggerDocument = YAML.load(
  path.join(__dirname, "../../swagger/swagger.yaml")
);

const app = express();
const indexRouter = require("../routes/indexRoute"),
  chatRouter = require("../routes/chatRoute"),
  userRouter = require("../routes/userRoute"),
  authRouter = require("../routes/authRoute"),
  cors = require("cors");

const jwt = require("../../controller/common/jwt");

const initiateHttpServer = (port) => {
  return new Promise((resolve, reject) => {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(
      cors({
        origin: ["http://localhost:8000"],
      })
    );
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/", indexRouter);
    app.use("/chat", jwt.validate, chatRouter);
    app.use("/user", jwt.validate, userRouter);
    app.use("/auth", authRouter);
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
