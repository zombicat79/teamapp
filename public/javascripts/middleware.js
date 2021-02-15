// console.log("JS FILE WORKING MOFO");

// function allTeamMembers(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     const li = document.createElement("li");
//     li.innerText = `${arr[0].team.username}`;
//     teamList.appendChild(li);
//   }
// }

// module.exports = allTeamMembers;

function IsLoggedin(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.render("index", {
      errorMessage: "Please make sure you are correctly logged in.",
    });
  }
}

// function allowedIn(req, res, next, userToCheck, routeToCheck) {
//   console.log("user id", userToCheck._id);

//   if (req.session.currentUser._id != userToCheck._id) {
//     res.render("user-views/user-main", {
//       errorMessage: "You cannot access this page",
//     });
//   } else {
//     if (routeToCheck === "users/edit") {
//       res.render("user-views/edit-user", { userToCheck });
//     } else if (routeToCheck === "users/profile") {
//       res.render("user-views/profile-view", { userToCheck });
//     }
//   }
// }

// function projectAllowedIn(req, res, next, projectCreatorToCheck, routeToCheck) {
//   if (req.session.currentUser._id != projectCreatorToCheck.creator._id) {
//     res.render("user-views/user-main", {
//       errorMessage: "You cannot access this page",
//     });
//   } else {
//     if (routeToCheck === "project/edit") {
//       res.render("project-views/edit-project", { projectCreatorToCheck });
//     }
//   }
// }
// module.exports = projectAllowedIn;

module.exports = IsLoggedin;
// module.exports = allowedIn;
