require("dotenv").config();

const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./pool");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

const app = express();
const publicPath = path.join(__dirname, "public");

const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(publicPath));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.listen(PORT, () => {
  console.log(`app is running on localhost:${PORT}`);
});
