const { validationResult, matchedData } = require("express-validator");
const { registerUser } = require("../db/queries");
const passport = require("../config/passport");

async function addUser(req, res) {
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
}

async function loginUser(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("loginpage", {
      errors: errors.array(),
    });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).render("loginpage", {
        errors: [{ msg: info.message }],
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.redirect("/");
    });
  })(req, res, next);
}

module.exports = { addUser, loginUser };
