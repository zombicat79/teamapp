const express = require("express");
const userRouter = express.Router();
const mongoose = require("mongoose");
const User = require("./../models/user");
const { isLoggedIn, isCurrentUser } = require("./../middleware");
const fileUploader = require("./../configs/cloudinary")
const path = require("path");

const bcrypt = require("bcrypt");

userRouter.get("/main", isLoggedIn, function (req, res, next) {
  User.find()
    .populate("projects")
    .then((allUsers) => {
      res.render("user-views/user-main", { allUsers: allUsers });
    })
    .catch((err) => next(err));
});

userRouter.get("/favorites/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .populate("favoriteCreators")
    .then((currentUser) => {
      res.render("user-views/user-favorites", { currentUser });
    })
    .catch((err) => next(err));
});

userRouter.get("/main/:search", isLoggedIn, function (req, res, next) {
  const { search } = req.query;

  User.find({
    $or: [
      { location: search },
      { username: search },
      { skills: search },
      // { projects: search },
    ],
  })
    .populate('projects')
    .then((matchingUsers) => {
      if (matchingUsers.length === 0) {
        res.render("user-views/user-main", {
          errorMessage: "Nothing was found. Please try again",
        });
      } else {
        res.render("user-views/user-main", { matchingUsers: matchingUsers });
      }
    })
    .catch((err) => next(err));
});

userRouter.get("/detail/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;
  let alreadyFav =false; 

  User.findById(req.session.currentUser._id)
    .then((data) => {
      if(data.favoriteCreators.includes(id)){
        alreadyFav = true; 
      }

    })
    .catch((err) => console.log(err));

  User.findById(id)
    .then((selectedUser) => {
      res.render("user-views/user-detail", { selectedUser, alreadyFav });
    })
    .catch((err) => next(err));
});

userRouter.post("/detail/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;
  const currentUser = req.session.currentUser._id;

  User.findByIdAndUpdate(currentUser, {$push: {favoriteCreators: id }})
  .then( (currentUser) => {
    res.redirect(`/users/favorites/${currentUser._id}`)
  })
  .catch( (err) => next(err));
})

userRouter.post("/favorites/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;
  const currentUser = req.session.currentUser._id;

  User.findByIdAndUpdate(currentUser, {$pull: {favoriteCreators: id}})
  .then( (currentUser) => {
    res.redirect(`/users/favorites/${currentUser._id}`)
  })
  .catch( (err) => next(err));
})

userRouter.get("/profile", isLoggedIn, function (req, res, next) {
  const id = req.session.currentUser._id;

  User.findById(id)
    .then((selectedUser) => {
      res.render("user-views/profile-view", {
        selectedUser: selectedUser,
        isUsersProfile: true,
      });
    })
    .catch((err) => next(err));
});

userRouter.get(
  "/edit/:id",
  isLoggedIn,
  isCurrentUser,
  function (req, res, next) {
    const { id } = req.params;

    User.findById(id)
      .then((selectedUser) => {
        res.render("user-views/edit-user", { userToCheck: selectedUser });
      })
      .catch((err) => next(err));
  }
);

userRouter.post("/edit/:id", isLoggedIn, fileUploader.single('image'), function (req, res, next) {
  const { id } = req.params;
  const {
    username,
    email,
    phone,
    profileImage,
    password,
    newPassword,
    confirmPassword,
    location,
    skills,
  } = req.body;

  User.findById(id).then((userToCheck) => {
    let oldPassword = userToCheck.oldPassword;
    if (password !== "" && (newPassword.length === "" || confirmPassword === "")) {
      res.render("user-views/edit-user", {
        errorMessage: "Something went wrong. Please try again.",
        userToCheck,
      });
      return;
    }

    if (password !== "" && password !== oldPassword) {
      res.render("user-views/edit-user", {
        errorMessage: "Something went wrong. Please try again.",
        userToCheck,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.render("user-views/edit-user", {
        errorMessage: "Something went wrong. Please try again.",
        userToCheck,
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const imageUrl = req.file.path;

    if (password === "" && newPassword === "" && confirmPassword === "") {
      User.findByIdAndUpdate(id, {
        username,
        email,
        phone,
        profileImage: imageUrl,
        location,
        skills,
      })
        .then((selectedUser) => {
          res.redirect(`/users/profile/`)
        })
        .catch((err) => next(err));
    }
    else if (password !== "" && newPassword === confirmPassword) {
      User.findByIdAndUpdate(id, {
        username,
        email,
        phone,
        profileImage: imageUrl,
        password: hashedPassword,
        newPassword: "x",
        confirmPassword,
        oldPassword: newPassword,
        location,
        skills,
      })
        .then((selectedUser) => {
          res.redirect(`/users/profile/`)
        })
        .catch((err) => next(err));
    }
    else {
      res.render("user-views/edit-user", {
        errorMessage: "Something went wrong. Please try again.",
        userToCheck,
      });
      return;
    }
  });
});

userRouter.get("/projects/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;

  User.findById(id)
    .populate("projects")
    .then((projectInvolved) => {
      const data = { projectInvolved: projectInvolved };
      res.render("user-views/temp-user-project-view", data); // hbs file needs to be changed
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
