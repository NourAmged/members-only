function registerPage(req, res) {
  res.render("registerpage", { user: req.user });
}

function loginPage(req, res) {
  res.render("loginpage", { user: req.user });
}

function homePage(req, res) {
  return res.render("homepage", { user: req.user });
}

module.exports = {
  registerPage,
  loginPage,
  homePage,
};
