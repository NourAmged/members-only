const { validationResult, matchedData } = require("express-validator");
const { registerUser } = require("../db/queries");

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

async function loginUser(req, res) {
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
}

module.exports = { addUser, loginUser };
