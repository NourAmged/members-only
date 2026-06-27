require("dotenv").config();

const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");

const indexRouter = require("./routes/indexRouter");
const {
  registerRouter,
  loginRouter,
  logoutRouter,
  make,
  makePostRouter,
} = require("./routes/authRouter");

const app = express();
const publicPath = path.join(__dirname, "public");

const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(publicPath));

app.use("/", indexRouter);

app.use("/login", loginRouter);

app.use("/register", registerRouter);

app.use("/logout", logoutRouter);

app.use("/new-post", makePostRouter);

app.listen(PORT, () => {
  console.log(`app is running on localhost:${PORT}`);
});
