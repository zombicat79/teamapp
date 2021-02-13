const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const User = require('./../models/user');

/* GET users listing. */
userRouter.get('/main', function(req, res, next) {
  
  User.find()
  .then( (allUsers) => {
    res.render('user-views/user-main', {allUsers});
  })
  .catch( (err) => console.log(err));  
});

userRouter.get('/main/:search', function (req, res, next) {
  const {search} = req.query
  console.log({search})

  User.find({$or: [{location: search}, {username: search}]})
  .then( (matchingUsers) => {
    res.render('user-views/user-main', {matchingUsers});
  })
  .catch( (err) => console.log(err));
})

module.exports = userRouter;
