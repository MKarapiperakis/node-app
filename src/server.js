const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const drRouter = require("./routes/data-read");
const dwRouter = require("./routes/data-write");
const swaggerDocument = yaml.load("./swagger.yaml");
const { OpenApiValidator } = require("express-openapi-validator");
const {
  RestError,
  AuthError,
  BadRequestError,
  NotFoundError,
} = require("./lib/errors");
const { bearerAuthenticator, basicAuthenticator } = require("./middlewares/authenticator");


require("dotenv").config();

const app = express()
.use(require('express-status-monitor')())
  .use(cors())
  .use(express.json({ limit: "20MB" }))
  .use("/data/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = async () => {
  await new OpenApiValidator({
    apiSpec: "./swagger.yaml",
    validateSecurity: {
      handlers: {
        BearerAuth: bearerAuthenticator,
        BasicAuth: basicAuthenticator
      },
    },
  }).install(app);

  return app
    .use("/data/api", [drRouter, dwRouter])
    .use("*", (req, res, next) => next(new NotFoundError()))
    .use((err, req, res, next) => {
      const isOpenApi = !!err.errors;
      if (!isOpenApi) return next(err);
      switch (err.message) {
        case "not found":
          return next(new NotFoundError());
        default:
          if (!err.status || err.status === 400)
            return next(new BadRequestError(err.message));
          if (err.status === 401) return next(new AuthError(err.message));
          return next(err);
      }
    })
    .use((err, req, res, next) => {
      if (!(err instanceof RestError) && !err.status) {
        err.status = 500;
        err.statusDetail = "Internal Server Error";
      }
      res
        .status(err.status)
        .send({
          error: true,
          status: err.status,
          statusDetail: err.statusDetail,
          type: err.name,
          message: err.message,
        });
      console.error("error: ",err);
    });
};
