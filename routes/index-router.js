const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const indexRouter = express.Router();
const User = require("./../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.render("index", { title: "Team App", layout: false });
});

//MAIN ROUTE - links to project main & user main
indexRouter.get("/main/", (req, res, next) => {
  const id = req.session.currentUser._id;

  User.findById(id)
  .then((currentUser) => {
    res.render("main", {currentUser} )
  })
  .catch( (err) => next(err))
})

module.exports = indexRouter;
