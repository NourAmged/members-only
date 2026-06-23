const { body, validationResult, matchedData } = require("express-validator");
// const { registerUser } = require("../db/queries");

const validateUser = [

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

const loginUser = [
  ...validateUser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("loginpage", {
        errors: errors.array(),
      });
    }

    const data = matchedData(req);

    try {
      await registerUser(data);
      res.redirect("/");
    } catch (error) {
      return res.status(400).render("loginpage", {
        errors: [{ msg: error.message }],
      });
    }
  },
];

module.exports = loginUser;
