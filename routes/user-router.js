const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const User = require('./../models/user');
const isLoggedIn = require("../public/javascripts/middleware");
const allowedIn = require("../public/javascripts/middleware");

userRouter.get('/main', isLoggedIn, function(req, res, next) {
  
  User.find()
  .then( (allUsers) => {
    res.render('user-views/user-main', {allUsers});
  })
  .catch( (err) => next(err));  
});

userRouter.get('/main/:search', isLoggedIn, function (req, res, next) {
  const {search} = req.query;

  User.find({$or: [{location: search}, {username: search}, {skills: search}, {projects: search}]})
  .then( (matchingUsers) => {
    if (matchingUsers.length === 0) {
      res.render('user-views/user-main', {errorMessage: "Nothing was found. Please try again"});
    }
    else {
    res.render('user-views/user-main', {matchingUsers});
    }
  })
  .catch( (err) => next(err));
})

userRouter.get('/detail/:id', isLoggedIn, function (req, res, next) {
  const {id} = req.params

  User.findById(id)
  .then( (selectedUser) => {
    res.render('user-views/user-detail', {selectedUser});
  })
  .catch( (err) => next(err));
})

userRouter.get('/profile/:id', isLoggedIn, function (req, res, next){
  const {id} = req.params
  
  User.findById(id)
  .then( (selectedUser) => {
    res.render('user-views/profile-view', {selectedUser});
  })
  .catch( (err) => next(err));
})

userRouter.get('/edit/:id', isLoggedIn, function (req, res, next){
  const {id} = req.params
  
  User.findById(id)
  .then( (selectedUser) => {
    allowedIn(req, res, next, selectedUser);
  })
  .catch( (err) => next(err));
})

userRouter.post('/edit/:id', isLoggedIn, function (req, res, next){
  const {id} = req.params;
  const {username, email, phone, location} = req.body;

  User.findByIdAndUpdate(id, {username, email, phone, location})
  .then( (selectedUser) => {
    res.redirect(`/users/profile/${selectedUser._id}`)
  })
  .catch( (err) => next(err));
})

userRouter.get('/projects/:id', isLoggedIn, function (req, res, next){
  const {id} = req.params;

  User.findById(id)
  .then( (selectedUser) => {
    res.render('user-views/temp-user-project-view', {selectedUser}) // hbs file needs to be changed 
  })
  .catch( (err) => next(err));
})

userRouter.get('/projects/:id/:search', isLoggedIn, function (req, res, next){ //hbs file needs to be changed and logic reorganized according to the model
  const {id} = req.params;
  const {search} = req.query;
  
  User.findById(id)
  .then( (selectedUser) => {
    User.find({$and: [{_id: id}, {projects: search}]})
  .then( (matchingProjects) => {
    if (matchingProjects.length === 0) {
      res.render('user-views/temp-user-project-view', {selectedUser, errorMessage: "Nothing was found. Please try again"});
    }
    else {
      res.render('user-views/temp-user-project-view', {selectedUser, matchingProjects});
    }
  })
  })
  .catch( (err) => next(err));
})

module.exports = userRouter;