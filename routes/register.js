const { Router } = require("express");

const registerPage = require("../controllers/registerpage");
const addUser = require("../controllers/addUser");

const registerRouter = Router();

registerRouter.get("/", registerPage);
registerRouter.post("/", )

module.exports = registerRouter;
