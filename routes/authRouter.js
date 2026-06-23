const { Router } = require("express");

const { validateUserRegister } = require("../validators/userValidator");
const { validateUserLogin } = require("../validators/userValidator");

const { addUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");

const { registerPage, loginPage } = require("../controllers/pageController");

const registerRouter = Router();
const loginRouter = Router();

registerRouter.get("/", registerPage);
registerRouter.post("/", validateUserRegister, addUser);

loginRouter.get("/", loginPage);

module.exports = { registerRouter, loginRouter };
