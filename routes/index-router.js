const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const indexRouter = express.Router();
const User = require("./../models/user");

const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.render("index");
});

//MAIN ROUTE - links to project main & user main
indexRouter.get("/main/:id", (req, res, next) => {
  const { id } = req.params;
  const data = { id: id };
  console.log("data :>> ", data);

  res.render("main", data);
});

module.exports = indexRouter;
