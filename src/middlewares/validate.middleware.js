const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

module.exports = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = {};
    console.log(errors.array())
    errors.array().map((err) => (error[err.path] = err.msg));
    return response.status(StatusCodes.BAD_REQUEST).json({ error });
  }
  next();
};
