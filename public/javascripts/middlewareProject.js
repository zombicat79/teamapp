function projectAllowedIn(req, res, next, projectCreatorToCheck, routeToCheck) {
  if (req.session.currentUser._id != projectCreatorToCheck.creator._id) {
    res.render("user-views/user-main", {
        
      errorMessage: "You cannot access this page",
    });
  } else {
    if (routeToCheck === "project/edit") {
        console.log(projectCreatorToCheck.creator._id);
        
      res.render("project-views/edit-project", { projectCreatorToCheck });
    }
  }
}
module.exports = projectAllowedIn;
