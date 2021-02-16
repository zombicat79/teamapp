const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const projectRouter = express.Router();
const Project = require("./../models/project");
const {projectAllowedIn, isLoggedIn} = require("./../middleware");


// create project views
projectRouter.get("/create", isLoggedIn, (req, res, next) => {
  res.render("project-views/create-project");
  console.log("req.session.currentUser._id :>> ", req.session.currentUser._id);
});
projectRouter.post("/create/", (req, res, next) => {
  // in order to retrieve the userId from url, we need to send it in the first place.
  const {
    // the form to create a project should redirect to /create/:userID
    title, // in order to do so, I must send the users' data into this form & update its action.
    description,
    category,
    wantedSkills,
    startDate,
    releaseDate,
    screenshots,
  } = req.body;

  const userIdModel = req.session.currentUser._id;

  Project.create({
    title,
    creator: userIdModel,
    description,
    category,
    wantedSkills,
    startDate,
    releaseDate,
    screenshots,
  })
    .then((data) => res.redirect("/project/main"))
    .catch((err) => console.log(err));
});

// Edit project views
projectRouter.get("/edit/:id", isLoggedIn, projectAllowedIn, (req, res, next) => {
  const { id } = req.params;

  Project.findById(id)
    .then((project) => {
      res.render("project-views/edit-project", { projectCreatorToCheck: project });
    })
    .catch((err) => console.log("there's a problem", err));
});

projectRouter.post("/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    category,
    wantedSkills,
    startDate,
    releaseDate,
    screenshots,
  } = req.body;

  console.log(id);
   
  Project.findByIdAndUpdate(id, {
    title,
    description,
    category,
    wantedSkills,
    startDate,
    releaseDate,
    screenshots,
  })
    .then((project) => {
      const data = { project: project };
      res.redirect(`/project/details/${id}`);
    })
    .catch((err) => console.log("err"));
});

// project / main see all the projects on the platform
projectRouter.get("/main", isLoggedIn, (req, res, next) => {
  Project.find()
    .then((project) => {
      const data = { project: project };
      res.render("project-views/project-main", data);
    })
    .catch((err) => console.log(err));
});
projectRouter.get("/main/:search", isLoggedIn, function (req, res, next) {
  const { search } = req.query;
  console.log(req.query);

  Project.find({ $or: [{ title: search }, { description: search }] })
    .then((matchingProjects) => {
      if (matchingProjects.length === 0) {
        res.render("project-views/project-main", {
          errorMessage: "Nothing was found. Please try again",
        });
      } else {
        res.render("project-views/project-main", { matchingProjects });
      }
    })
    .catch((err) => console.log(err));
});

// Project / detailed view
projectRouter.get("/details/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Project.findById(id)
    .populate("creator")
    .populate("team")
    .then((project) => {
      const data = { project };
      //   console.log("project.team :>> ", project.team[0].username);
      //   allTeamMembers(project); // cannot modify DOM from here?
      res.render("project-views/project-detail", data);
    })
    .catch((err) => console.log(err));
});

// Project / add member
// projectRouter.post("/add-member/:id", isLoggedIn, (req, res, next) => {
//   const userIdAdd = req.session.currentUser._id;
//   const { id } = req.params;
//   console.log("getting here");

//   Project.findByIdAndUpdate(id, { team: userIdAdd }) // expected this to add new user to the team object: team.push(`${userIdAdd}`)
//     .then((data) => {
//       console.log("typeof", typeof name);

//       console.log("added to the team!");
//       res.redirect(`/project/details/${id}`);
//     })
//     .catch((err) => console.log(err, "not added to the team"));
// });

module.exports = projectRouter;
