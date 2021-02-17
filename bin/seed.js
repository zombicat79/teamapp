const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./../models/user');
const Project = require('./../models/project')

const users = [
    {
        username: "Mr. Robot",
        password: "neverknow",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "neverknow",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "noprotection",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "12345",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "easytohack21",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "vivelafrance",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "hocuspocus",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "pepperoni",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "hahahahaha",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "sayonara_baby",
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
        confirmPassword: "",
        newPassword: "",
        oldPassword: "7ywh6",
        email: "akatsuki@playfulstudio.com",
        phone: "+817382545",
        profileImage: "https://soranews24.com/wp-content/uploads/sites/3/2018/06/la-1.png",
        location: "Tokyo",
        skills: ["2D graphics", "Music composition", "Pixel art", "Sound engineering"],
        projects: ["Cyber Shadow", "Lacuna"]
    }
];

const projects = [
   {
        title: "Cyber Shadow",
        creator: "Mr. Robot",
        category: ["Action", "Platforms"],
        description: "Authentic 8-bit recreation with handcrafted sprites, detailed pixel aesthetics, and seamless controls, all with the addition of modern touches such as smoother animations, multi-layered parallax backgrounds, and an evolved game design.",
        team: ["Mr. Robot", "Jeanlux", "Akatsuki98"],
        wantedSkills: ["Beta testing"],
        startDate: new Date(2020, 10, 17),
        releaseDate: new Date(2021, 09, 01),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/861250/ss_fecf423e76c45ca9563c0e33439144ee5fd2b6c0.600x338.jpg?t=1611959684", "https://cdn.akamai.steamstatic.com/steam/apps/861250/ss_543c90de51389a1cfa233e8dc8bc0ba750cc232e.600x338.jpg?t=1611959684", "https://cdn.akamai.steamstatic.com/steam/apps/861250/ss_214480c7d27037cea74bc6ca4df63749e7b1e4a2.600x338.jpg?t=1611959684"]
   },
   {
        title: "Instant Farmer",
        creator: "Ultranerd",
        category: ["Puzzles", "Strategy"],
        description: 'A country life, growing a vegetable garden in your own ranch. In this tiny fantasy countryside experience, that is easy to do and very relaxing. Just keep in mind: water brings life. Swap the blocks of earth, stone, water, and others, so that all the arable soil receives the necessary water. Solve the challenge and feel the pleasure of watching the plants instantly grow and bear fruit. As you progress solving the challenges, see your farm expand and evolve with new types of vegetables.',
        team: ["Ultranerd", "Jeanlux", "Akatsuki98"],
        wantedSkills: ["Unity", "JavaScript", "Sound engineering"],
        startDate: new Date(2020, 12, 13),
        releaseDate: new Date(2021, 06, 05),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1399670/ss_627f84f71800184d5bcc1c88086aeab05d142a23.600x338.jpg?t=1612917778"]
   },
   {
        title: "2D Neon Cube",
        creator: "Async_await95",
        category: ["Puzzles", "Platforms"],
        description: "Exciting obstacles and graphical effects. Move the main character to the portal and try not to die!",
        team: ["Async_await95"],
        wantedSkills: ["Project management", "Beta testing", "Sound engineering"],
        startDate: new Date(2021, 01, 07),
        releaseDate: new Date(2021, 07, 22),
        screenshots: ["https://cdn.cloudflare.steamstatic.com/steam/apps/701720/ss_1099bb8fc78c56da1d7e78c5089a7ad977d9832e.600x338.jpg?t=1603800537", "https://cdn.cloudflare.steamstatic.com/steam/apps/701720/ss_42aa0913cf7b4088ed70c8d0a1b2c6526fddb052.600x338.jpg?t=1603800537"]
   },
   {
        title: "The Darkside Detective: A Fumble in the Dark",
        creator: "Futuregirl",
        category: ["Adventure"],
        description: "Uses point-and-click technology. Photorealistic pixel rendering.",
        team: ["Franxxesca"],
        wantedSkills: ["Project management"],
        startDate: new Date(2020, 08, 12),
        releaseDate: new Date(2021, 10, 05),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/795420/ss_1ee58058071669c7ad4202dc311aa8291282fa41.600x338.jpg?t=1612373733", "https://cdn.akamai.steamstatic.com/steam/apps/795420/ss_ec75563ea3e94005f7df186da33a8839b4192474.600x338.jpg?t=1612373733", "https://cdn.akamai.steamstatic.com/steam/apps/795420/ss_7f33999bdaeb55a74e664aeda156547c60393e83.600x338.jpg?t=1612373733"]
   },
   {
        title: "Pecaminosa",
        creator: "Futuregirl",
        category: ["RPG", "Action"],
        description: "It combines the charm of pixel art and the mechanics of an Action RPG with the atmosphere of a Noir film.",
        team: ["Futuregirl", "Jeanlux"],
        wantedSkills: ["Scriptwriting", "Project management", "C++"],
        startDate: new Date(2020, 11, 03),
        releaseDate: new Date(2021, 12, 28),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1366770/ss_bd803a8d5215b20235ad51166fee1322a4007c42.600x338.jpg?t=1613128286", "https://cdn.akamai.steamstatic.com/steam/apps/1366770/ss_d9996d37a20971051dd5b259dbbae0425038f2c4.600x338.jpg?t=1613128286", "https://cdn.akamai.steamstatic.com/steam/apps/1366770/ss_4b3f75c8800b35c31727392dd59e0836acd49473.600x338.jpg?t=1613128286"]
   },
   {
        title: "The Day Before",
        creator: "MagicJoe",
        category: ["Action", "Shooter"],
        description: "Open-world survival MMO set in a deadly post-pandemic America plagued by infected and cannibalistic people, and survivors who kill each other for food, weapons and cars.",
        team: ["MagicJoe", "Gandalf89"],
        wantedSkills: ["Music composition", "Scriptwriting"],
        startDate: new Date(2019, 10, 18),
        releaseDate: new Date(2021, 05, 11),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1372880/ss_ef6041e2f4099474b33ea960e570c94bc79eb30f.600x338.jpg?t=1613061124", "https://cdn.akamai.steamstatic.com/steam/apps/1372880/ss_037f47b44a9372088e240852ba155d2d71d2f288.600x338.jpg?t=1613061124", "https://cdn.akamai.steamstatic.com/steam/apps/1372880/ss_afa98dc14b63dcf6844fc4c6392b0d3feb357379.600x338.jpg?t=1613061124"]
   },
   {
        title: "The Forest",
        creator: "TheTerminator",
        category: ["Action", "Simulation"],
        description: "As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first person survival horror simulator.",
        team: ["TheTerminator", "Gandalf89"],
        wantedSkills: ["C++", "Scriptwriting", "Sound engineering"],
        startDate: new Date(2019, 08, 25),
        releaseDate: new Date(2021, 06, 16),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/242760/ss_8b6ee5b52fa2b058c20447b57317f6d50ddb313c.600x338.jpg?t=1590522045", "https://cdn.akamai.steamstatic.com/steam/apps/242760/ss_a1a871918b4fa3dcc71f19f3aa4ea1fff3ab649b.600x338.jpg?t=1590522045", "https://cdn.akamai.steamstatic.com/steam/apps/242760/ss_d77d402c78451a04b5c370e81ff7767c4008343c.600x338.jpg?t=1590522045"]
   },
   {
        title: "Lacuna",
        creator: "Akatsuki98",
        category: ["Adventure"],
        description: "A murder. A hack. A bombing. All it takes to plunge the solar system into war – unless you do something about it. Help CDI agent Neil Conrad make a string of increasingly difficult decisions in this modern dialog-driven adventure set in a gorgeous 2D sci-fi noir universe.",
        team: ["Akatsuki98", "Franxxesca"],
        wantedSkills: ["HTML & CSS", "JavaScript", "C++"],
        startDate: new Date(2020, 02, 27),
        releaseDate: new Date(2021, 04, 10),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1364100/ss_939bace90d1861069f931bbf15fd4199514731c8.600x338.jpg?t=1612771276", "https://cdn.akamai.steamstatic.com/steam/apps/1364100/ss_3ad2950a3a41f8a9f34e157db83f71b66b67e2da.600x338.jpg?t=1612771276", "https://cdn.akamai.steamstatic.com/steam/apps/1364100/ss_6dc775192c8731f34d97f2ec60f82220208e8226.600x338.jpg?t=1612771276"]
   }
];


const usersB = [
    {
        username: "Mr. Robot",
        password: "neverknow",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "neverknow",
        email: "robot@tech.co.uk",
        phone: "+4414587297",
        profileImage: "https://pyxis.nymag.com/v1/imgs/04b/3cc/bbdfab84f9276e72f626049f9c2c7d7097-12-mr-robot-where.rsquare.w700.jpg",
        location: "London",
        skills: ["2D graphics", "Pixel art"],
    },
    {
        username: "Ultranerd",
        password: "noprotection",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "noprotection",
        email: "powernerd@boldgames.com",
        phone: "+4987692345",
        profileImage: "https://media.thetab.com/blogs.dir/5/files/2014/03/nerd.jpg",
        location: "Dortmund",
        skills: ["3D graphics", "C++"],
    },
    {
        username: "Async_await95",
        password: "12345",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "12345",
        email: "dfsolo@gmail.com",
        phone: "+34678452790",
        profileImage: "https://cdn.vox-cdn.com/thumbor/o2rDUJI9wVLyux6BDBWDxAR06Lg=/0x0:998x749/1400x1400/filters:focal(0x0:998x749):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/47038870/tech-nerd.0.0.jpg",
        location: "Barcelona",
        skills: ["JavaScript", "HTML & CSS"],
    },
    {
        username: "Futuregirl",
        password: "easytohack21",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "easytohack21",
        email: "powergirl@labstudio.com",
        phone: "+1384756940",
        profileImage: "https://pbs.twimg.com/profile_images/1084574571318181889/B4juu9g6.jpg",
        location: "Los Angeles",
        skills: ["Conceptual design", "2D graphics", "Pixel art"],
    },
    {
        username: "Jeanlux",
        password: "vivelafrance",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "vivelafrance",
        email: "jeanlucpetit@yahoo.fr",
        phone: "+333765928",
        profileImage: "http://31.media.tumblr.com/5732cd0aad66afc5ebaed85b6eb194c3/tumblr_n0a8zoZySB1subvnlo1_500.jpg",
        location: "Paris",
        skills: ["Music composition", "Sound engineering"],
    },
    {
        username: "Gandalf89",
        password: "hocuspocus",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "hocuspocus",
        email: "joseportells@hotmail.com",
        phone: "+346823674",
        profileImage: "https://penaltiloungebar.es/wp-content/uploads/2016/10/nerd-buff1.jpg",
        location: "Barcelona",
        skills: ["3D graphics", "Unity", "Beta testing"],
    },
    {
        username: "Franxxesca",
        password: "pepperoni",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "pepperoni",
        email: "franmaldini@gemail.com",
        phone: "+3987832094",
        profileImage: "https://www.wikihow.com/images_en/thumb/b/b5/Dress-Like-a-Nerd-Step-1-Version-2.jpg/v4-460px-Dress-Like-a-Nerd-Step-1-Version-2.jpg",
        location: "Milan",
        skills: ["Scriptwriting", "Conceptual design", "Beta testing"],
    },
    {
        username: "MagicJoe",
        password: "hahahahaha",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "hahahahaha",
        email: "joethemagician@gmail.com",
        phone: "+44387462847",
        profileImage: "https://www.digopaul.com/wp-content/uploads/related_images/2015/09/09/nerd_3.jpg",
        location: "London",
        skills: ["C++", "Unity", "JavaScript", "HTML & CSS"],
    },
    {
        username: "TheTerminator",
        password: "sayonara_baby",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "sayonara_baby",
        email: "freddiengoma@gmail.com",
        phone: "+13748752092",
        profileImage: "https://pbs.twimg.com/media/Et_54YWVcAEXDmv.jpg",
        location: "San Francisco",
        skills: ["Conceptual design", "Project management", "Beta testing"],
    },
    {
        username: "Akatsuki98",
        password: "7ywh6",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "7ywh6",
        email: "akatsuki@playfulstudio.com",
        phone: "+817382545",
        profileImage: "https://soranews24.com/wp-content/uploads/sites/3/2018/06/la-1.png",
        location: "Tokyo",
        skills: ["2D graphics", "Music composition", "Pixel art", "Sound engineering"],
    }
];

const projectsB = [
   {
        title: "Cyber Shadow",
        creator: "Mr. Robot",
        category: ["Action", "Platforms"],
        description: "Authentic 8-bit recreation with handcrafted sprites, detailed pixel aesthetics, and seamless controls, all with the addition of modern touches such as smoother animations, multi-layered parallax backgrounds, and an evolved game design.",
        team: ["Mr. Robot", "Jeanlux", "Akatsuki98"],
        wantedSkills: ["Beta testing"],
        startDate: new Date(2020, 10, 17),
        releaseDate: new Date(2021, 09, 01),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/861250/ss_fecf423e76c45ca9563c0e33439144ee5fd2b6c0.600x338.jpg?t=1611959684", "https://cdn.akamai.steamstatic.com/steam/apps/861250/ss_543c90de51389a1cfa233e8dc8bc0ba750cc232e.600x338.jpg?t=1611959684", "https://cdn.akamai.steamstatic.com/steam/apps/861250/ss_214480c7d27037cea74bc6ca4df63749e7b1e4a2.600x338.jpg?t=1611959684"]
   },
   {
        title: "Instant Farmer",
        creator: "Ultranerd",
        category: ["Puzzles", "Strategy"],
        description: 'A country life, growing a vegetable garden in your own ranch. In this tiny fantasy countryside experience, that is easy to do and very relaxing. Just keep in mind: water brings life. Swap the blocks of earth, stone, water, and others, so that all the arable soil receives the necessary water. Solve the challenge and feel the pleasure of watching the plants instantly grow and bear fruit. As you progress solving the challenges, see your farm expand and evolve with new types of vegetables.',
        team: ["Ultranerd", "Jeanlux", "Akatsuki98"],
        wantedSkills: ["Unity", "JavaScript", "Sound engineering"],
        startDate: new Date(2020, 12, 13),
        releaseDate: new Date(2021, 06, 05),
        screenshots: ["https://cdn.akamai.steamstatic.com/steam/apps/1399670/ss_627f84f71800184d5bcc1c88086aeab05d142a23.600x338.jpg?t=1612917778"]
   },
];


mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then( (x) => {
    const pr = x.connection.dropDatabase();
    console.log("Connected to Mongo! Seeding initial data!")
    return pr;
  })
  .then(() => {
    const pr = User.create(usersB);
    return pr;
  })
  .then((createdUsers) => {

    const updatedProjects = projectsB.map((projectObj, i) => {
        const index = i + 1;
        // Get user id for the creator
        const creatorIndex = (index * 5) - 5;

        console.log('creatorIndex :>> ', creatorIndex);
        const creator = createdUsers[creatorIndex];
        const creatorId = creator._id;

        // Get user ids for the team array
        const team = createdUsers.slice(index,index * 5);
        const teamIds = team.map((user)=> user._id);

        // copy the project object and change creator and team properties
        const updatedProject = { ...projectObj, creator: creatorId, team: teamIds};
        return updatedProject;
    });

    const pr = Project.create(updatedProjects);
    return pr;
  })
  .then((createdProjects)=> {
      const updatePromises = createdProjects.map((project)=> {
          const pr = User.findByIdAndUpdate(project.creator, { $push: {projects: project._id }});
          return pr;
      });

      const bigPr =  Promise.all(updatePromises);
      return bigPr;
  })
  .then((updatedUsers)=> {})
  .catch( (err) => console.log('Error connecting to mongo', err));
 
  