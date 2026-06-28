const { Router } = require("express");

const {
  validateUserRegister,
  validateUserLogin,
  validatePost,
} = require("../middlewares/userValidator");

const {
  addUser,
  loginUser,
  logoutUser,
  isLoggedIn,
  isLoggedOut,
  postContent,
} = require("../controllers/authController");

const {
  registerPage,
  loginPage,
  newPost,
} = require("../controllers/pageController");

const registerRouter = Router();

const loginRouter = Router();
const logoutRouter = Router();

const makePostRouter = Router();

registerRouter.get("/", isLoggedOut, registerPage);
loginRouter.get("/", isLoggedOut, loginPage);
logoutRouter.get("/", isLoggedOut, logoutUser);
makePostRouter.get("/", isLoggedIn, newPost);

registerRouter.post("/", validateUserRegister, addUser);
loginRouter.post("/", validateUserLogin, loginUser);
makePostRouter.post("/", isLoggedIn, validatePost, postContent);

module.exports = { registerRouter, loginRouter, logoutRouter, makePostRouter };
