const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const { port, sessionSecret, databaseSettings } = require("../config");
const { logger } = require("./handlers");
const { requestLogger } = require("./middlewares");
const routes = require("./routes");
const db = require("./data");
const session = require("express-session");
const passport = require("passport");

db.connect().then(() => {
  const app = express();

  app.use(requestLogger);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Authentication configuration
  const SQLiteStore = require("connect-sqlite3")(session);
  const sqliteStoreOptions = {
    db: databaseSettings.fileName,
    dir: databaseSettings.path,
  };
  app.use(
    session({
      store: new SQLiteStore(sqliteStoreOptions),
      secret: sessionSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  require("./authentication/strategies/local.strategy");

  // Server base route
  app.get("/", (_, response) => {
    response.status(StatusCodes.OK).json({
      message: "Welcome to Task Trail Api",
      version: process.env.npm_package_version,
    });
  });

  // Register system routes
  app.use(routes);

  app.set("port", port);
  const server = http.createServer(app);
  server.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
});
