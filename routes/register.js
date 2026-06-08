const { Router } = require("express");

const registerPage = require("../controllers/registerpage");

const registerRouter = Router();

registerRouter.get("/", registerPage);

module.exports = registerRouter;
