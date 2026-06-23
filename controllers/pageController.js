function registerPage(req, res) {
  res.render("registerpage");
}

function loginPage(req, res) {
  res.render("loginpage");
}

function homePage(req, res) {
  return res.render("homepage");
}

module.exports = {
  registerPage,
  loginPage,
  homePage,
};
