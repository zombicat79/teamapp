const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const authRouter = express.Router();
const User = require("./../models/user");
const fileUploader = require("./../configs/cloudinary")

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
        res.redirect(`/main/`);
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
  res.render("user-views/create-user", { title: "Team App", layout: false });
});

authRouter.post("/signup", fileUploader.single('image'), (req, res, next) => {
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
      res.render("index", {
        errorMessage: "Something went wrong. Please try again",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let imageUrl;
      if (req.file) {
        imageUrl = req.file.path;
      } else {
        imageUrl = "";
      }

    User.create({
      username,
      password: hashedPassword,
      email,
      phone,
      profileImage: imageUrl,
      location,
      skills,
      projects,
    })
      .then((createdUser) => {
        req.session.currentUser = createdUser;
        res.redirect("/main");
      })
      .catch((err) => {
        console.log(err);
        res.render("index", {
          errorMessage: "Something went wrong. Please try again",
        });
      });
  });
});

authRouter.get("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      next();
    } else {
      res.redirect("/");
    }
  });
});

module.exports = authRouter;
