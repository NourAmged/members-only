const { Router } = require("express");
const loginPage = require("../controllers/loginpage");

const loginRouter = Router();

loginRouter.get("/", loginPage);

module.exports = loginRouter;
