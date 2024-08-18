module.exports = (dbContext, Sequelize) => {
  return {
    User: require("./user.model")(dbContext, Sequelize),
    TaskList: require("./task-list.model")(dbContext, Sequelize),
    Task: require("./task.model")(dbContext, Sequelize),
  };
};
