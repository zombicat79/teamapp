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

/*function allowedIn(req, res, next) {
    if (req.session.currentUser._id === selectedUser._id) {
        next();
    }
    else {
        res.render("user-views/user-main", {errorMessage: "You cannot edit this page"});
    }
}*/

module.exports = IsLoggedin;
// module.exports = allowedIn;
