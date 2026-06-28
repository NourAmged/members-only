const { body } = require("express-validator");

const validateUserRegister = [
  body("fullname")
    .trim()
    .isLength({ min: 3, max: 32 })
    .withMessage("fullname should be 3 to 32 characters long")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("fullname should contain letters no special characters"),

  body("username")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("username should be 3 to 12 characters long")
    .isAlphanumeric()
    .withMessage(
      "username should only contains numerical and alphabetical values",
    ),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password should at least 8 characters long"),

  body("confirm-password").custom((value, { req }) => {
    if (value !== req.body.password)
      throw new Error("Passwords does not match");
    return true;
  }),
];

const validateUserLogin = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("username should be 3 to 12 characters long")
    .isAlphanumeric()
    .withMessage(
      "username should only contains numerical and alphabetical values",
    ),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password should at least 8 characters long"),
];

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 35 })
    .withMessage("Title of post should be between 10 and 35"),

  body("content")
    .trim()
    .isLength({ min: 10, max: 255 })
    .withMessage("Content of post should be between 10 and 255"),
];

module.exports = { validateUserRegister, validateUserLogin, validatePost };
