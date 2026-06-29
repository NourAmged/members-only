function registerPage(req, res, next) {
  res.render("registerpage", { user: req.user });
}

function loginPage(req, res, next) {
  res.render("loginpage", { user: req.user });
}

function homePage(req, res, next) {
  console.log(req.user);
  return res.render("homepage", { user: req.user, posts: req.posts });
}

function newPost(req, res, next) {
  return res.render("newpost", { user: req.user });
}

module.exports = {
  registerPage,
  loginPage,
  homePage,
  newPost,
};
