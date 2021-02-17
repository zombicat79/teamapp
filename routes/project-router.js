const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const projectRouter = express.Router();
const Project = require("./../models/project");
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
      res.render("project-views/project-detail", data);
    })
    .catch((err) => console.log(err));
});

// Logged in user's projects view
projectRouter.get("/users/details", isLoggedIn, (req, res, next) => {
  const userId = req.session.currentUser._id;
  Project.find({
    $or: [{ team: userId }, { creator: userId }, { applicants: userId }],
  })
    .then((usersProject) => {
      const projectsAsCreator = [];
      const projectsAsMember = [];
      const projectsApplied = [];
      const projectsHaveApplicants = [];

      usersProject.forEach((el) => {
        const userIsCreator = String(el.creator) === userId;
        const userIsApplicant = el.applicants.includes(userId);
        const userIsTeamMember = el.team.includes(userId);

        if (userIsCreator) {
          projectsAsCreator.push(el);
          if (el.applicants.length > 0) {
            projectsHaveApplicants.push(el);
          }
        } else if (!userIsCreator) {
          if (userIsTeamMember) {
            projectsAsMember.push(el);
          } else if (userIsApplicant) {
            projectsApplied.push(el);
          }
        }
      });

      const data = {
        projectsAsCreator: projectsAsCreator,
        projectsAsMember: projectsAsMember,
        projectsApplied: projectsApplied,
        projectsHaveApplicants: projectsHaveApplicants,
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

// Project / applying to a team
projectRouter.post("/apply/:id", isLoggedIn, (req, res, next) => {
  const userIdAdd = req.session.currentUser._id;
  const { id } = req.params;

  Project.findByIdAndUpdate(id, { $push: { applicants: userIdAdd } })
    .then((data) => {
      res.redirect(`/project/users/details`);
    })
    .catch((err) => console.log(err, "not added to the team"));
});

// Seeing applications to a project
projectRouter.get("/applicants/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Project.findById(id)
    .populate("applicants")
    .then((projects) => {
      const projectId = projects._id;
      const projectIdArr = {projectId: projectId};

      const data = { projects: projects, projectIdArr}
      console.log("data", data);
 

      res.render("project-views/applicants", data);
    })
    .catch((err) => console.log(err));
});

// Accept application to a project
projectRouter.get(
  "/users/detail/:idApplicant/accept/:idProject",
  (req, res, next) => {
    const { id } = req.params;

    Project.findByIdAndUpdate(id)
      .then((projToUpdate) => {})
      .catch((err) => console.log(err));
  }
);

module.exports = projectRouter;
