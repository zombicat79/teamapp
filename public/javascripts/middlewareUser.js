function allowedIn(req, res, next, userToCheck, routeToCheck) {
  console.log("user id", userToCheck._id);

  if (req.session.currentUser._id != userToCheck._id) {
    res.render("user-views/user-main", {
      errorMessage: "You cannot access this page",
    });
  } else {
    if (routeToCheck === "users/edit") {
      res.render("user-views/edit-user", { userToCheck });
    } else if (routeToCheck === "users/profile") {
      res.render("user-views/profile-view", { userToCheck });
    }
  }
}

module.exports = allowedIn;
