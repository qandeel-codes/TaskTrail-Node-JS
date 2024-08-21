module.exports = (dbContext, Sequelize) => {
  const User = require("./user.model")(dbContext, Sequelize);
  const TaskList = require("./task-list.model")(dbContext, Sequelize);
  const Task = require("./task.model")(dbContext, Sequelize);

  TaskList.hasMany(Task, { as: "tasks" });
  Task.belongsTo(TaskList, { as: "taskList" });

  return {
    User: User,
    TaskList: TaskList,
    Task: Task,
  };
};
