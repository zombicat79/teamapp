const Project = require('./../../models/project');

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
  
    console.log('req.path :>> ', req.path);
  
  
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
        console.log('userId :>> ', userId);
  console.log('project.creator :>> ', project.creator);
  console.log('userId :>> ', typeof userId);
  console.log('project.creator :>> ', typeof project.creator);

  console.log('typeof userId === typeof project.creator :>> \n', typeof userId === typeof project.creator);
      if (userId !== String(project.creator)) {
        res.render("user-views/user-main", { 
          errorMessage: "You cannot access this page",
        });

      } else {
          next();
      }
    })
    .catch((err) => console.log("there's a problem", err));
}

module.exports = {isLoggedIn, isCurrentUser, projectAllowedIn }; 
