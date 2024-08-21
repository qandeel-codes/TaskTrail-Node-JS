module.exports = (dbContext, Sequelize) => {
  const Task = dbContext.define("task", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
  });

  return Task;
};
