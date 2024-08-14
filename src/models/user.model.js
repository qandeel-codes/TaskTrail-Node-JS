module.exports = (dbContext, Sequelize) => {
  return dbContext.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    registeredAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  });
};
