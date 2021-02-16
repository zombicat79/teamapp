const Project = require('./models/project');

// console.log("JS FILE WORKING MOFO");

// function allTeamMembers(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     const li = document.createElement("li");
//     li.innerText = `${arr[0].team.username}`;
//     teamList.appendChild(li);
//   }
// }

// module.exports = allTeamMembers;

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("index", {
      errorMessage: "Please make sure you are correctly logged in.",
    });
  }
}

function isCurrentUser(req, res, next) {
    const { id } = req.params;
  
    if (req.session.currentUser._id !== id) {
      res.render("user-views/user-main", {
        errorMessage: "You cannot access this page",
      });
    } else {
       next()
    }
}

function projectAllowedIn(req, res, next) {
  const projectId = req.params.id;
  const userId = req.session.currentUser._id;


  Project.findById(projectId)
    .then((project) => {
      if (userId !== String(project.creator)) {
        res.render("user-views/user-main", { 
          errorMessage: "You cannot access this page",
        });

      } else {
          next();
      }
    })
    .catch((err) => next(err));
}

module.exports = {isLoggedIn, isCurrentUser, projectAllowedIn }; 
