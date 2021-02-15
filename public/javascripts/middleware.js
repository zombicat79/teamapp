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
    }
    else {
        res.render("index", {errorMessage: "Please make sure you are correctly logged in."});
    }
}

function allowedIn(req, res, next, userToCheck) {
    if (req.session.currentUser._id != userToCheck._id) {
        res.render("user-views/user-main", {errorMessage: "You cannot access this page"});
    }
    else {
        res.render('user-views/edit-user', {userToCheck});
    }
}

module.exports = IsLoggedin;
module.exports = allowedIn;
