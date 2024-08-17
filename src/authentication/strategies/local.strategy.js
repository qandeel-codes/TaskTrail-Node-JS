const passport = require("passport");
const { Strategy } = require("passport-local");
const {
  models: { User },
} = require("../../data");
const { hashPassword } = require("../../handlers");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) throw new Error("Invalid Credentials");
      const isPasswordValid = await hashPassword.validate(
        password,
        user.password
      );
      if (!isPasswordValid) throw new Error("Invalid Credentials");
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);
