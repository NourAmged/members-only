const { Router } = require("express");


const { validateUserRegister } = require("../middlewares/userValidator");
const { validateUserLogin } = require("../middlewares/userValidator");

const { addUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");

const { registerPage, loginPage } = require("../controllers/pageController");

const registerRouter = Router();
const loginRouter = Router();

registerRouter.get("/", registerPage);
registerRouter.post("/", validateUserRegister, addUser);

loginRouter.get("/", loginPage);

loginRouter.post(
  "/",
  validateUserLogin,
  loginUser,
);

module.exports = { registerRouter, loginRouter };
