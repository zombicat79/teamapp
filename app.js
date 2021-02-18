require('dotenv').config();

const createError = require("http-errors");
const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require("./routes/index-router");
const authRouter = require("./routes/auth-router")
const userRouter = require("./routes/user-router");
const projectRouter = require("./routes/project-router");

const app = express();



//Connection to the database
mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log("Connected to the DB");
  })
  .catch((err) => {
    console.log("Error connection to db", err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//SESSION (COOKIES) MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // cookie: { maxAge: 3600000 * 1 },	// 1 hour
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 7, // Time to live - 7 days (14 days - Default)
    }),
  })
);

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/project", projectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;


