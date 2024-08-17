const { StatusCodes } = require("http-status-codes");

module.exports = (request, response, next) => {
  if (request.isAuthenticated()) {
    next();
  } else {
    return response.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};
