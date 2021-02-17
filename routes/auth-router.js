const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const authRouter = express.Router();
const User = require("./../models/user");
const fileUploader = require("./../configs/cloudinary")

const bcrypt = require("bcrypt");

//LOGIN ROUTE
authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.render("index", {
      errorMessage: "Please enter a valid username and password", layout: false });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (user === null) {
        res.render("index", {
          errorMessage: "Something went wrong. Please try again", layout: false });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, user.password);
    
      if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect(`/main/`);
      } else {
        res.render("index", {
          errorMessage: "Something went wrong. Please try again", layout: false });;
      }
    })
    .catch((err) => {
      res.render("index", {
        errorMessage: "Something went wrong. Please try again", layout: false});
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
    newPassword,
    OldPassword,
    confirmPassword,
    email,
    phone,
    profileImage,
    location,
    skills,
    projects,
  } = req.body;
  
  User.findOne({ username }).then((user) => {
    if (user !== null) {
      res.render("index", {
        errorMessage: "Something went wrong. Please try again",
      });
      return;
    }

    if (confirmPassword !== password) {
      res.render("user-views/create-user", {
        errorMessage: "Something went wrong. Please try again", username, email, phone, profileImage, location, skills, layout: false});
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg";
    }

    User.create({
      username,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      newPassword: "x",
      oldPassword: password,
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
