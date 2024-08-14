const { Router } = require("express");
const controller = require("../controllers/auth.controller");
const passport = require("passport");
const { check } = require("express-validator");
const { Validate } = require("../middlewares");

const router = Router();

router.post(
  "/register",
  check("name").not().isEmpty().withMessage("Name is required").trim().escape(),
  check("email")
    .isEmail()
    .withMessage("Missing or invalid email address")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 characters length"),
  Validate,
  controller.register
);

router.post(
  "/",
  check("email")
    .notEmpty()
    .withMessage("Missing email address")
    .normalizeEmail(),
  check("password").notEmpty().withMessage("Missing password"),
  Validate,
  passport.authenticate("local"),
  controller.login
);

router.get("/status", controller.status);

router.post("/logout", controller.logout);

module.exports = router;
