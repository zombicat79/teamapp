# TEAM APP

## Description

The purpose of this app is to match project managers with potential collaborators, centered on the field of indie game development. 



## Features

- **404** - Screen to show whenever a user navigates to a page that doesn't exist.
- **500** - Screen to show whenever a server-side error occurred.
- **login** - Landing page where users are prompted to either log in in case they have an account or create a new account in case they don't.
- **sign up** - Screen showing a form by means of which the users can create their new accounts.
- **homepage** - Main screen of the app, displaying the existing projects and a searchbar on top. Every project can then be accessed by clicking on it.
- **user view** - Screen displaying the registered users and a searchbar on top. Every profile can then be accessed by clicking on it.
- **edit user** - Screen displaying a form allowing logged in users to modify their profiles.
- **personal projects** - Screen displaying a list of the projects a certain user is currently working on. It contains a link permitting users to create their own projects.
- **project creation screen** - Screen enabling logged in users to start their own projects from scratch.
- **update project screen** - Screen enabling users to modify the terms of their projects.
- **user detail screen** - Screen that renders a full view of a specific user and their details.
- **project detail screen** - Screen that renders a full view of a specific project and its details.

- **logout** - Ends the session and takes the user back to the login screen



## Server routes (back-end)

| **Method** | **Route**                             | **Description**                                              | Request - Body                                               |
| ---------- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `GET`      | `/`                                   | Main page route prompting login. Renders home `index` view.  |                                                              |
| `POST`     | `/login`                              | Sends login info to server from `index` view.                | { username, password }                                       |
| `GET`      | `/signup`                             | Renders `create-user`view to create a new account.           |                                                              |
| `POST`     | `/signup`                             | Sends signup info to server from `create-user` view          | { username, password, email, phone, profile_image, location, skills, projects} |
| `GET`      | `/main-projects`                      | Renders `project-main` view to show all existing projects    |                                                              |
| `GET`      | `/main-projects/:search`              | Renders the `project-main` view, showing only the projects that match the search parameters. |                                                              |
| `GET`      | `/main-users`                         | Renders `user-main` view to show all existing projects       |                                                              |
| `GET`      | `/main-users/:search`                 | Renders the `user-main` view, showing only the projects that match the search parameters. |                                                              |
| `GET`      | `/edit-user/:id`                      | Renders the `edit-user` view, showing a form allowing users to update their details. |                                                              |
| `POST`     | `/edit-user/:id`                      | Sends modified user fields back to the server and redirects user to the `profile-view` | { username, password, email, phone, profile_image, location, skills, projects} |
| `GET`      | `/user-profile/:id`                   | Renders `profile-view` view showing current user profile     |                                                              |
| `GET`      | `/user-projects/:id`                  | Renders `user-project-view` view showing projects with which the current user is involved in. |                                                              |
| `GET`      | `/user-projects/:id/:search`          | Renders the `user-project-view` view, showing only the projects that match the search parameters. | req.params                                                   |
| `GET`      | `/edit-project/:id`                   | Renders the `edit-project` view, showing a form allowing users to update the project details. |                                                              |
| `POST`     | `/edit-project/:id`                   | Sends modified project fields back to the server and redirects user to the `user-project-view` | {title, creator, category, description, team, wantedSkills, startDate, releaseDate, screenshots} |
| `POST`     | `/edit-project/:id/delete/:projectId` | Deletes project an redirects user to the `user-project-view` | req.params                                                   |
| `GET`      | `/create-project`                     | Renders the `create-project` view, where users can create their new projects |                                                              |
| `POST`     | `/create-project`                     | Sends new project data to the server and redirects user to `user-project-view` | {title, creator, category, description, team, wantedSkills, startDate, releaseDate, screenshots} |
| `GET`      | `/user-detail/:id`                    | Renders the `user-detail` view, where user details can be accessed independently |                                                              |
| `GET`      | `/project-detail/:id`                 | Renders the `project-detail` view, where project details can be accessed independently |                                                              |
| `POST`     | `/logout`                             | Ends the session and redirects the user back to the `/` view | req.params                                                   |



## Models

2 collections, according to the following schemas:

- USERS:

  ```js
  {
    username: {type: String, unique: true, required: true}
    password: {type: String, required: true}
    email: {type: String, unique: true, required: true}
    phone: String
    profileImage: {type: String, required: false},
    location: String,
    skills: [{ 
      type: String enum: ['2D graphics', '3D graphics', 'Unity', 'Scriptwriting', 'Pixel art', 'Music composition', 'Sound engineering', 'C++', 'JavaScript', 'HTML & CSS', 'Project management', 'Conceptual design', 'Beta testing']
    }],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
  }
  ```

  

- PROJECTS:

  ```js
  {
    title: String,
    creator: {type: Schema.Types.ObjectId, ref: 'User'}
    category: { 
      type: String enum: ['Action', 'Adventure', 'RPG', 'Platforms', 'Sports', 'Puzzles', 'Shooter', 'Simulation', 'Strategy', 'Racing']
    }
    description: String,
    team: [{type: Schema.Types.ObjectId, ref: 'User'}],
    wantedSkills: [{type: String enum: ['2D graphics', '3D graphics', 'Unity', 'Scriptwriting', 'Pixel art', 'Music composition', 'Sound engineering', 'C++', 'JavaScript', 'HTML & CSS', 'Project management', 'Conceptual design', 'Beta testing']}],
    startDate: Date,
    releaseDate: Date,
    screenshots: [String],
  }
  ```



## Backlog

- Addition of favorites creators and/or projects

- Social media API integration

- Chat feature

- Expand the app scope to other industries

  

## Links

### Trello:

https://trello.com/b/KuMmQgT7/project-2-ih-team-app

### GitHub:

https://github.com/zombicat79/teamapp

### Slides:

TBA