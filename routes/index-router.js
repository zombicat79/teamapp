const express = require('express');
const mongoose = require('mongoose');
const app = require('../app');
const indexRouter = express.Router();
const User = require('./../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index');
});

//MAIN ROUTE
indexRouter.get('/main', (req, res, next) => {
  res.render('main');
})

module.exports = indexRouter;
