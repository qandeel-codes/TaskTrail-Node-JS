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
      return response.status(StatusCodes.CREATED).json({
        message: "User registered successfully",
        data: {
          userId: savedUser.id,
          email: savedUser.email,
          name: savedUser.name,
        },
      });
    } catch (error) {
      logger.error(`Registration failed, Something went wrong: ${error}`);
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Registration failed, Something went wrong" });
    }
  },

  login: (request, response) => {
    const { user } = request;
    return response.status(StatusCodes.OK).send({
      message: `User logged in successfully`,
      data: {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
    });
  },

  status: (request, response) => {
    const { user } = request;
    if (user) {
      return response.status(StatusCodes.OK).send({
        message: `User already logged in`,
        data: {
          userId: user.id,
          email: user.email,
          name: user.name,
        },
      });
    }
    return response.sendStatus(StatusCodes.UNAUTHORIZED);
  },

  logout: (request, response) => {
    if (!request.user) return response.sendStatus(StatusCodes.UNAUTHORIZED);
    request.logout((error) => {
      if (error) return response.sendStatus(StatusCodes.BAD_REQUEST);
      response
        .status(StatusCodes.OK)
        .json({ message: "User logged out successfully" });
    });
  },
};
