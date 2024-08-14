const bcrypt = require("bcrypt");

module.exports = {
  hash: (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  validate: (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
};
