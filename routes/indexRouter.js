const { Router } = require("express");

const { homePage } = require("../controllers/pageController");
const { getAllPosts } = require("../db/queries");

const indexRouter = Router();

indexRouter.use(async (req, res, next) => {
  req.posts = await getAllPosts();
  next();
});

indexRouter.get("/", homePage);

module.exports = indexRouter;
