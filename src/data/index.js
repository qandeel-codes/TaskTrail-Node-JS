const Sequelize = require("sequelize");
const { databaseOptions } = require("../../config");
const { logger } = require("../handlers");

const dbContext = new Sequelize(databaseOptions());

module.exports = {
  Sequelize: Sequelize,
  dbContext: dbContext,
  models: require("../models")(dbContext, Sequelize),

  connect: () => {
    return dbContext
      .sync({ alter: true })
      .then(() => {
        logger.info("Database synced successfully.");
        return dbContext
          .authenticate()
          .then(() => {
            logger.info("Database ready !!!");
          })
          .catch((error) => {
            logger.error(`Cannot connect to database: ${error}`);
          });
      })
      .catch((error) => {
        logger.error(`Cannot sync database: ${error}`);
      });
  },
};
