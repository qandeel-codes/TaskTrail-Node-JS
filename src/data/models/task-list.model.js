module.exports = (dbContext, Sequelize) => {
  return dbContext.define("task_list", {
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
    ownerId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  });
};
