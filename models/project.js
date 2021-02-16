const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  category: [
    {
      type: String /*enum: ['Action', 'Adventure', 'RPG', 'Platforms', 'Sports', 'Puzzles', 'Shooter', 'Simulation', 'Strategy', 'Racing']*/,
    },
  ],
  description: String,
  team: [{ type: Schema.Types.ObjectId, ref: "User" }],
  wantedSkills: [
    {
      type: String /*enum: ['2D graphics', '3D graphics', 'Unity', 'Scriptwriting', 'Pixel art', 'Music composition', 'Sound engineering', 'C++', 'JavaScript', 'HTML & CSS', 'Project management', 'Conceptual design', 'Beta testing'] */,
    },
  ],
  startDate: String,
  releaseDate: String,
  location: String,
  screenshots: {
    type: String,
    default:
      "https://i.pinimg.com/originals/26/89/90/268990fc1a05a52d8882b28db29e6789.png",
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
