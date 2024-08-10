module.exports = (dbContext, Sequelize) => {
  return {
    TaskList: require("./task-list.model")(dbContext, Sequelize),
  };
};
