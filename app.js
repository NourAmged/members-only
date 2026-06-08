require("dotenv").config();

const express = require("express");
const path = require("node:path");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

const app = express();
const publicPath = path.join(__dirname, "public");

const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.listen(PORT, () => {
  console.log(`app is running on localhost:${PORT}`);
});
