const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");
const User = require("./../models/user");
const {isLoggedIn, isCurrentUser, } = require("./../middleware");

const bcrypt = require("bcrypt");


userRouter.get("/main", isLoggedIn, function (req, res, next) {
  User.find()
    .populate('projects')
    .then((allUsers) => {
      res.render("user-views/user-main", { allUsers: allUsers});
    })
    .catch((err) => next(err));
});

userRouter.get("/main/:search", isLoggedIn, function (req, res, next) {
  const { search } = req.query;
  console.log(search);

  User.find({
    $or: [
      { location: search },
      { username: search },
      { skills: search },
      // { projects: search },
    ],
  })
    .then((matchingUsers) => {
      if (matchingUsers.length === 0) {
        res.render("user-views/user-main", {
          errorMessage: "Nothing was found. Please try again",
        });
      } else {
        res.render("user-views/user-main", { matchingUsers });
      }
    })
    .catch((err) => next(err));
});

userRouter.get("/detail/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .then((selectedUser) => {
      res.render("user-views/user-detail", { selectedUser });
    })
    .catch((err) => next(err));
});

userRouter.get("/profile/:id", isLoggedIn, isCurrentUser, function (req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .then((selectedUser) => {
      res.render("user-views/profile-view", { userToCheck: selectedUser, isUsersProfile: true });
    })
    .catch((err) => next(err));
});

userRouter.get("/edit/:id", isLoggedIn, isCurrentUser, function (req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .then((selectedUser) => {
      res.render("user-views/edit-user", { userToCheck: selectedUser });
    })
    .catch((err) => next(err));
});

userRouter.post("/edit/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;
  const { username, email, phone, profileImage, password, newPassword, confirmPassword, location, skills } = req.body;

  User.findById(id)
  .then( (userToCheck) => {
    let oldPassword = userToCheck.oldPassword;
    if (password === "" || newPassword.length === "" || confirmPassword === "") {
      res.render("user-views/edit-user", {errorMessage: "Something went wrong. Please try again.", userToCheck})
      return;
    }
    
    if (password !== oldPassword) {
      res.render("user-views/edit-user", {errorMessage: "Something went wrong. Please try again.", userToCheck})
      return;
    }
    
    if (newPassword !== confirmPassword) {
      res.render("user-views/edit-user", {errorMessage: "Something went wrong. Please try again.", userToCheck})
      return;
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    
  User.findByIdAndUpdate(id, { username, email, phone, profileImage, password: hashedPassword, newPassword: "x", confirmPassword, oldPassword: newPassword, location, skills } )
    .then((selectedUser) => {
      res.redirect(`/users/profile/${selectedUser._id}`);
    })
    .catch((err) => next(err));
  });
});

userRouter.get("/projects/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .then((selectedUser) => {
      res.render("user-views/temp-user-project-view", { selectedUser }); // hbs file needs to be changed
    })
    .catch((err) => next(err));
});

userRouter.get("/projects/:id/:search", isLoggedIn, function (req, res, next) {
  //hbs file needs to be changed and logic reorganized according to the model
  const { id } = req.params;
  const { search } = req.query;

  User.findById(id)
    .then((selectedUser) => {
      User.find({ $and: [{ _id: id }, { projects: search }] }).then(
        (matchingProjects) => {
          if (matchingProjects.length === 0) {
            res.render("user-views/temp-user-project-view", {
              selectedUser,
              errorMessage: "Nothing was found. Please try again",
            });
          } else {
            res.render("user-views/temp-user-project-view", {
              selectedUser,
              matchingProjects,
            });
          }
        }
      );
    })
    .catch((err) => next(err));
});

module.exports = userRouter;
