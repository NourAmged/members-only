const { Router } = require("express");

const { validateUserRegister } = require("../middlewares/userValidator");
const { validateUserLogin } = require("../middlewares/userValidator");

const { addUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");

const { registerPage, loginPage } = require("../controllers/pageController");

const registerRouter = Router();
const loginRouter = Router();
const logoutRouter = Router();

registerRouter.get("/", registerPage);
registerRouter.post("/", validateUserRegister, addUser);

loginRouter.get("/", loginPage);

loginRouter.post("/", validateUserLogin, loginUser);

logoutRouter.get("/", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

module.exports = { registerRouter, loginRouter, logoutRouter };
