const { Router } = require("express");

const { homePage } = require("../controllers/pageController");

const indexRouter = Router();

indexRouter.get("/", homePage);

module.exports = indexRouter;
