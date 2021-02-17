const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const projectRouter = express.Router();
const Project = require("./../models/project");
const User = require("./../models/user");
const {
  projectAllowedIn,
  isLoggedIn,
  allowedToDelete,
} = require("./../middleware");
const fileUploader = require("./../configs/cloudinary");

// create project views
projectRouter.get("/create", isLoggedIn, (req, res, next) => {
  res.render("project-views/create-project");
  console.log("req.session.currentUser._id :>> ", req.session.currentUser._id);
});
projectRouter.post(
  "/create/",
  fileUploader.single("screenshots"),
  (req, res, next) => {
    const {
      title,
      description,
      category,
      wantedSkills,
      startDate,
      releaseDate,
      location,
    } = req.body;

    const userIdModel = req.session.currentUser._id;

    let projectImageUrl;
    if (req.file) {
      projectImageUrl = req.file.path;
    } else {
      projectImageUrl = "";
    }

    Project.create({
      title,
      creator: userIdModel,
      description,
      category,
      wantedSkills,
      startDate,
      releaseDate,
      screenshots: projectImageUrl,
      location,
    })
      .then((data) => {
        res.redirect(`/project/details/${data._id}`);
        console.log(data._id);
      })
      .catch((err) => console.log(err));
  }
);

// Edit project views
projectRouter.get(
  "/edit/:id",
  isLoggedIn,
  projectAllowedIn,
  (req, res, next) => {
    const { id } = req.params;

    Project.findById(id)
      .then((project) => {
        res.render("project-views/edit-project", {
          projectCreatorToCheck: project,
        });
      })
      .catch((err) => console.log("there's a problem", err));
  }
);

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

projectRouter.post("/details/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const currentUser = req.session.currentUser._id;
  console.log(id)
  console.log(currentUser)

  User.findByIdAndUpdate(currentUser, {$push: {favoriteProjects: id }})
  .then((updatedUser) => {
    res.redirect(`/project/details/${id}`)
  })
  .catch( (err) => console.log(err));

});

// Logged in user's projects view
projectRouter.get("/users/details", isLoggedIn, (req, res, next) => {
  const userId = req.session.currentUser._id;
  Project.find({ $or: [{ team: userId }, { creator: userId }] })
    .then((usersProject) => {
      //   const showDelete = usersProject.creator === userId;
      //   usersProject.push(showDelete);

      //   console.log("usersproject", usersProject);

      const projectsAsCreator = [];
      const projectsAsMember = [];

      usersProject.forEach((el) => {
        if (String(el.creator) === userId) {
          projectsAsCreator.push(el);
        } else {
          projectsAsMember.push(el);
        }
      });

      const data = {
        projectsAsCreator: projectsAsCreator,
        projectsAsMember: projectsAsMember,
      };
      console.log(data);

      res.render("project-views/user-project-view", data);
    })
    .catch((err) => {
      console.log(err);
      res.render("project-views/user-project-view", {
        errorMessage: "There is a problem",
      });
    });
});

projectRouter.get("/favorites/:id", isLoggedIn, function (req, res, next) {
  const { id } = req.params;

  User.findById(id)
  .populate('favoriteProjects')
  .then((currentUser) => {
    res.render("project-views/project-favorites", {currentUser} )
  })
  .catch( (err) => next(err))
})

// Delete a project
projectRouter.get(
  "/delete/:id",
  isLoggedIn,
  allowedToDelete,
  (req, res, next) => {
    const { id } = req.params;

    Project.findByIdAndDelete(id)
      .then((data) => {
        res.redirect("/project/users/details");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/project/users/details");
      });
  }
);

// Project / add member to a team
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
