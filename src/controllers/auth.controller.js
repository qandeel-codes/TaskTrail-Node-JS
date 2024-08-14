const { StatusCodes } = require("http-status-codes");
const {
  models: { User },
} = require("../data");
const { logger, hashPassword } = require("../handlers");

module.exports = {
  register: async (request, response) => {
    const { name, email, password } = request.body;
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          error: "Email address is already used by another user in the system",
        });
      }
      const hashedPassword = await hashPassword.hash(password);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      return response.status(StatusCodes.CREATED).json(savedUser);
    } catch (error) {
      logger.error(`Registration failed, Something went wrong: ${error}`);
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Registration failed, Something went wrong" });
    }
  },

  login: (_, response) => {
    return response
      .status(StatusCodes.OK)
      .send({ message: `Authentication Done` });
  },

  status: (request, response) => {
    const { user } = request;
    if (user) {
      return response.status(StatusCodes.OK).send({
        message: "Authenticated User",
        userId: user.id,
        name: user.name,
      });
    }
    return response.sendStatus(StatusCodes.UNAUTHORIZED);
  },

  logout: (request, response) => {
    if (!request.user) return response.sendStatus(StatusCodes.UNAUTHORIZED);
    request.logout((error) => {
      if (error) return response.sendStatus(StatusCodes.BAD_REQUEST);
      response.sendStatus(StatusCodes.OK);
    });
  },
};
