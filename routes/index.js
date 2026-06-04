
const { Router } = require("express");
const homePage = require("../controllers/homepage");

const indexRouter = Router();

indexRouter.get("/", homePage);

module.exports = indexRouter;
