const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    phone: String,
    profileImage: {type: String, default: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'"}, //needs correction --- try using Cloudinary
    location: String,
    skills: [{
      type: String, //enum: ['2D graphics', '3D graphics', 'Unity', 'Scriptwriting', 'Pixel art', 'Music composition', 'Sound engineering', 'C++', 'JavaScript', 'HTML & CSS', 'Project management', 'Conceptual design', 'Beta testing']
  }],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
