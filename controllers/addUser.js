const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
  body("fullname")
    .trim()
    .isLength({ min: 3, max: 32 })
    .withMessage("fullname should be 3 to 32 characters long")
    .isAlpha({ ignore: " " })
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
    if (value !== req.body.password) throw new Error("Passwords must be same");
  }),
];
