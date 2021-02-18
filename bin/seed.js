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
    },
    {
        username: "Zombiecat",
        password: "miaoowrghh",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "miaoowrghh",
        email: "zombiecat79@hotmail.com",
        phone: "+34817382545",
        profileImage: "/images/zombicat.jpg",
        location: "Barcelona",
        skills: ["Scriptwriting", "Javascript", "Pixel art", "HTML & CSS"],
    },
    {
        username: "Clensei",
        password: "aurevoir",
        confirmPassword: "",
        newPassword: "",
        oldPassword: "aurevoir",
        email: "clensei@yahoo.fr",
        phone: "+3334356456",
        profileImage: "/images/clensei.jpg",
        location: "Lyon",
        skills: ["3D graphics", "Music composition", "Sound engineering", "JavaScript"],
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
        startDate: "2020 / 10 / 17",
        releaseDate: "2021 / 09 / 01",
        location: "London",
        screenshots: "https://cdn.akamai.steamstatic.com/steam/apps/861250/ss_fecf423e76c45ca9563c0e33439144ee5fd2b6c0.600x338.jpg?t=1611959684",
   },
   {
        title: "Instant Farmer",
        creator: "Ultranerd",
        category: ["Puzzles", "Strategy"],
        description: 'A country life, growing a vegetable garden in your own ranch. In this tiny fantasy countryside experience, that is easy to do and very relaxing. Just keep in mind: water brings life. Swap the blocks of earth, stone, water, and others, so that all the arable soil receives the necessary water. Solve the challenge and feel the pleasure of watching the plants instantly grow and bear fruit. As you progress solving the challenges, see your farm expand and evolve with new types of vegetables.',
        team: ["Ultranerd", "Jeanlux", "Akatsuki98"],
        wantedSkills: ["Unity", "JavaScript", "Sound engineering"],
        startDate: "2020 / 12 / 13",
        releaseDate: "2021 / 06 / 05",
        location: "Dortmund",
        screenshots: "https://cdn.akamai.steamstatic.com/steam/apps/1399670/ss_627f84f71800184d5bcc1c88086aeab05d142a23.600x338.jpg?t=1612917778"
   },
   {
        title: "2D Neon Cube",
        creator: "Async_await95",
        category: ["Puzzles", "Platforms"],
        description: "Exciting obstacles and graphical effects. Move the main character to the portal and try not to die!",
        team: ["Async_await95"],
        wantedSkills: ["Project management", "Beta testing", "Sound engineering"],
        startDate: "2021 / 01 / 07",
        releaseDate: "2021 / 07 / 22",
        location: "Barcelona",
        screenshots: "https://cdn.cloudflare.steamstatic.com/steam/apps/701720/ss_1099bb8fc78c56da1d7e78c5089a7ad977d9832e.600x338.jpg?t=1603800537",
    },
    {
        title: "The Darkside Detective: A Fumble in the Dark",
        creator: "Futuregirl",
        category: ["Adventure"],
        description: "Uses point-and-click technology. Photorealistic pixel rendering.",
        team: ["Franxxesca"],
        wantedSkills: ["Project management"],
        startDate: "2020 / 08 / 12",
        releaseDate: "2021 / 10 / 05",
        location: "Los Angeles",
        screenshots: "https://cdn.akamai.steamstatic.com/steam/apps/795420/ss_1ee58058071669c7ad4202dc311aa8291282fa41.600x338.jpg?t=1612373733",
    },
    {
        title: "Pecaminosa",
        creator: "Futuregirl",
        category: ["RPG", "Action"],
        description: "It combines the charm of pixel art and the mechanics of an Action RPG with the atmosphere of a Noir film.",
        team: ["Futuregirl", "Jeanlux"],
        wantedSkills: ["Scriptwriting", "Project management", "C++"],
        startDate: "2020 / 11 / 03",
        releaseDate: "2021 / 12 / 28",
        location: "Milan",
        screenshots: "https://cdn.akamai.steamstatic.com/steam/apps/1366770/ss_bd803a8d5215b20235ad51166fee1322a4007c42.600x338.jpg?t=1613128286",
    },
    {
        title: "The Day Before",
        creator: "MagicJoe",
        category: ["Action", "Shooter"],
        description: "Open-world survival MMO set in a deadly post-pandemic America plagued by infected and cannibalistic people, and survivors who kill each other for food, weapons and cars.",
        team: ["MagicJoe", "Gandalf89"],
        wantedSkills: ["Music composition", "Scriptwriting"],
        startDate: "2019 / 10 / 18",
        releaseDate: "2021 / 05 / 11",
        location: "London",
        screenshots: "https://cdn.akamai.steamstatic.com/steam/apps/1372880/ss_ef6041e2f4099474b33ea960e570c94bc79eb30f.600x338.jpg?t=1613061124",
    },
    {
        title: "The Forest",
        creator: "TheTerminator",
        category: ["Action", "Simulation"],
        description: "As the lone survivor of a passenger jet crash, you find yourself in a mysterious forest battling to stay alive against a society of cannibalistic mutants. Build, explore, survive in this terrifying first person survival horror simulator.",
        team: ["TheTerminator", "Gandalf89"],
        wantedSkills: ["C++", "Scriptwriting", "Sound engineering"],
        startDate: "2019 / 08 / 25",
        releaseDate: "2021 / 06 / 16",
        location: "Paris",
        screenshots: "https://cdn.akamai.steamstatic.com/steam/apps/242760/ss_8b6ee5b52fa2b058c20447b57317f6d50ddb313c.600x338.jpg?t=1590522045", 
    },
    {
        title: "Lacuna",
        creator: "Akatsuki98",
        category: ["Adventure"],
        description: "A murder. A hack. A bombing. All it takes to plunge the solar system into war – unless you do something about it. Help CDI agent Neil Conrad make a string of increasingly difficult decisions in this modern dialog-driven adventure set in a gorgeous 2D sci-fi noir universe.",
        team: ["Akatsuki98", "Franxxesca"],
        wantedSkills: ["HTML & CSS", "JavaScript", "C++"],
        startDate: "2020 / 02 / 27",
        releaseDate: "2021 / 04 / 10",
        location: "Tokyo",
        screenshots: "https://cdn.akamai.steamstatic.com/steam/apps/1364100/ss_939bace90d1861069f931bbf15fd4199514731c8.600x338.jpg?t=1612771276",
    },
    {
        title: "Covid Panicdemic",
        creator: "Zombiecat",
        category: ["Action"],
        description: "Following the style of classic arcade retro game 1942, this game features COVID-19 virus trying to infect as many city buildings as possible. Features different kinds of enemies.",
        team: ["MagicJoe", "Ultranerd"],
        wantedSkills: ["Scriptwriting", "Beta testing"],
        startDate: "2021 / 01 / 27",
        releaseDate: "2021 / 02 / 01",
        screenshots: "/images/covid.png",
        location: "Barcelona",
        playableDemo: "https://zombicat79.github.io/Covid-Panicdemic/"
    },
    {
        title: "Eat'em owl",
        creator: "Clensei",
        category: ["Action"],
        description: "Action game 2D game featuring multiple enemies coming from all 4 directions. Make your owl survive a viral attack from the evil environment",
        team: ["Gandalf89", "Futuregirl"],
        wantedSkills: ["3D graphics", "Unity"],
        startDate: "2021 / 01 / 15",
        releaseDate: "2021 / 02 / 09",
        screenshots: "/images/owl.png",
        location: "Lyon",
        playableDemo: "https://clensei.github.io/eat-em-owl/"
    }
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
    const pr = User.create(users);
    return pr;
  })
  .then((createdUsers) => {

    const updatedProjects = projects.map((projectObj, i) => {
        const index = i + 1;
        // Get user id for the creator
        const creatorIndex = index // (index * 5) - 5;

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
 
  