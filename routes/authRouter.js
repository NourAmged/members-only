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
  joinMember,
  isNotMember,
} = require("../controllers/authController");

const {
  registerPage,
  loginPage,
  newPost,
  member,
} = require("../controllers/pageController");

const registerRouter = Router();

const loginRouter = Router();
const logoutRouter = Router();

const makePostRouter = Router();

const memberRouter = Router();

registerRouter.get("/", isLoggedOut, registerPage);
loginRouter.get("/", isLoggedOut, loginPage);
logoutRouter.get("/", logoutUser);
makePostRouter.get("/", isLoggedIn, newPost);
memberRouter.get("/", isLoggedIn, isNotMember, member);

registerRouter.post("/", validateUserRegister, addUser);
loginRouter.post("/", validateUserLogin, loginUser);
makePostRouter.post("/", isLoggedIn, validatePost, postContent);
memberRouter.post("/", isLoggedIn, joinMember);

module.exports = {
  registerRouter,
  loginRouter,
  logoutRouter,
  makePostRouter,
  memberRouter,
};
