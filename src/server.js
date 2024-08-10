const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const { port } = require("../config");
const { logger } = require("./handlers");
const { requestLogger } = require("./middlewares");
const routes = require("./routes");
const db = require("./data");

db.connect().then(() => {
  const app = express();

  app.use(requestLogger);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", (_, response) => {
    response.status(StatusCodes.OK).json({
      message: "Welcome to Task Trail Api",
      version: process.env.npm_package_version,
    });
  });

  app.use(routes);

  app.set("port", port);
  const server = http.createServer(app);
  server.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
});
