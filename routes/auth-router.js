const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const authRouter = express.Router();
const User = require("./../models/user");

const bcrypt = require("bcrypt");
//const saltRounds = 10;

//LOGIN ROUTE
authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.render("index", {
      errorMessage: "Please enter a valid username and password",
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (user === null) {
        res.render("index", {
          errorMessage: "Something went wrong. Please try again",
        });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, user.password);
      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect(`/main/${user._id}`);
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.render("index", {
        errorMessage: "Something went wrong. Please try again",
      });
    });
});

//SIGN UP ROUTE
authRouter.get("/signup", (req, res, next) => {
  res.render("user-views/create-user");
});

authRouter.post("/signup", (req, res, next) => {
  const {
    username,
    password,
    email,
    phone,
    profileImage,
    location,
    skills,
    projects,
  } = req.body;
  console.log({
    username,
    password,
    email,
    phone,
    profileImage,
    location,
    skills,
    projects,
  });
  User.findOne({ username }).then((user) => {
    if (user !== null) {
      res.render("/", {
        errorMessage: "Something went wrong. Please try again",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    User.create({
      username,
      password: hashedPassword,
      email,
      phone,
      profileImage,
      location,
      skills,
      projects,
    })
      .then((createdUser) => res.redirect("/main"))
      .catch((err) =>
        res.render("index", {
          errorMessage: "Something went wrong. Please try again",
        })
      );
  });
});

module.exports = authRouter;
