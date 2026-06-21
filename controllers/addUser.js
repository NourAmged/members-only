const { body, validationResult, matchedData } = require("express-validator");
const { registerUser } = require("../db/queries");

const validateUser = [
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

const addUser = [
  ...validateUser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("registerpage", {
        errors: errors.array(),
      });
    }

    const data = matchedData(req);

    try {
      await registerUser(data);
      res.redirect("/");
    } catch (error) {
      return res.status(400).render("registerpage", {
        errors: [{ msg: error.message }],
      });
    }
  },
];

module.exports = addUser;
