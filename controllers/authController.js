const { validationResult, matchedData } = require("express-validator");
const { registerUser, addContent } = require("../db/queries");
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

function logoutUser(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect("/");
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect("/");
}

async function postContent(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("newpost", {
      errors: errors.array(),
    });
  }

  const data = matchedData(req);
  console.log(data);
  try {
    await addContent(data, req.user.id);
    res.redirect("/");
  } catch (error) {
    return res.status(400).render("newpost", {
      errors: [{ msg: error.message }],
    });
  }
}

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  isLoggedIn,
  isLoggedOut,
  postContent,
};
