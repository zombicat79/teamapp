const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userModel = require('./../models/user');

const users = [
    {
        username: "Mr. Robot",
        password: "neverknow",
        email: "robot@tech.co.uk",
        phone: "+4414587297",
        profileImage: "https://pyxis.nymag.com/v1/imgs/04b/3cc/bbdfab84f9276e72f626049f9c2c7d7097-12-mr-robot-where.rsquare.w700.jpg",
        location: "London",
        skills: ["2D graphics", "Pixel art"],
        projects: ["Cyber Shadow"]
    },
    {
        username: "Ultranerd",
        password: "noprotection",
        email: "powernerd@boldgames.com",
        phone: "+4987692345",
        profileImage: "https://media.thetab.com/blogs.dir/5/files/2014/03/nerd.jpg",
        location: "Dortmund",
        skills: ["3D graphics", "C++"],
        projects: ["Instant Farmer"]
    },
    {
        username: "Async_await95",
        password: "12345",
        email: "dfsolo@gmail.com",
        phone: "+34678452790",
        profileImage: "https://cdn.vox-cdn.com/thumbor/o2rDUJI9wVLyux6BDBWDxAR06Lg=/0x0:998x749/1400x1400/filters:focal(0x0:998x749):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/47038870/tech-nerd.0.0.jpg",
        location: "Barcelona",
        skills: ["JavaScript", "HTML & CSS"],
        projects: ["2D Neon Cube"]
    },
    {
        username: "Futuregirl",
        password: "easytohack21",
        email: "powergirl@labstudio.com",
        phone: "+1384756940",
        profileImage: "https://pbs.twimg.com/profile_images/1084574571318181889/B4juu9g6.jpg",
        location: "Los Angeles",
        skills: ["Conceptual design", "2D graphics", "Pixel art"],
        projects: ["The Darkside Detective: A Fumble in the Dark", "Pecaminosa"]
    },
    {
        username: "Jeanlux",
        password: "vivelafrance",
        email: "jeanlucpetit@yahoo.fr",
        phone: "+333765928",
        profileImage: "http://31.media.tumblr.com/5732cd0aad66afc5ebaed85b6eb194c3/tumblr_n0a8zoZySB1subvnlo1_500.jpg",
        location: "Paris",
        skills: ["Music composition", "Sound engineering"],
        projects: ["Cyber Shadow", "Pecaminosa"]
    },
    {
        username: "Gandalf89",
        password: "hocuspocus",
        email: "joseportells@hotmail.com",
        phone: "+346823674",
        profileImage: "https://penaltiloungebar.es/wp-content/uploads/2016/10/nerd-buff1.jpg",
        location: "Barcelona",
        skills: ["3D graphics", "Unity", "Beta testing"],
        projects: ["The Day Before", "The Forest"]
    },
    {
        username: "Franxxesca",
        password: "pepperoni",
        email: "franmaldini@gemail.com",
        phone: "+3987832094",
        profileImage: "https://www.wikihow.com/images_en/thumb/b/b5/Dress-Like-a-Nerd-Step-1-Version-2.jpg/v4-460px-Dress-Like-a-Nerd-Step-1-Version-2.jpg",
        location: "Milan",
        skills: ["Scriptwriting", "Conceptual design", "Beta testing"],
        projects: ["The Darkside Detective: A Fumble in the Dark", "Lacuna"]
    },
    {
        username: "MagicJoe",
        password: "hahahahaha",
        email: "joethemagician@gmail.com",
        phone: "+44387462847",
        profileImage: "https://www.digopaul.com/wp-content/uploads/related_images/2015/09/09/nerd_3.jpg",
        location: "London",
        skills: ["C++", "Unity", "JavaScript", "HTML & CSS"],
        projects: ["The Day Before"]
    },
    {
        username: "TheTerminator",
        password: "sayonara_baby",
        email: "freddiengoma@gmail.com",
        phone: "+13748752092",
        profileImage: "https://pbs.twimg.com/media/Et_54YWVcAEXDmv.jpg",
        location: "San Francisco",
        skills: ["Conceptual design", "Project management", "Beta testing"],
        projects: ["The Forest"]
    },
    {
        username: "Akatsuki98",
        password: "7ywh6",
        email: "akatsuki@playfulstudio.com",
        phone: "+817382545",
        profileImage: "https://soranews24.com/wp-content/uploads/sites/3/2018/06/la-1.png",
        location: "Tokyo",
        skills: ["2D graphics", "Music composition", "Pixel art", "Sound engineering"],
        projects: ["Cyber Shadow", "Lacuna"]
    }
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then( (x) => {
    const pr = x.connection.dropDatabase;
    return pr;
  })
  .then(() => {
    const pr = userModel.create(users);
    return pr;
  })
  .then( (data) => {
      console.log("Connected to Mongo! Seeding initial data!")
  })
  .catch( (err) => console.log('Error connecting to mongo', err));
 
  