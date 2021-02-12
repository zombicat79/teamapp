const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    phone: String,
    profileImage: {type: String, required: false},
    location: String,
    /*skills: [{ 
    //type: String, enum: ['2D graphics', '3D graphics', 'Unity', 'Scriptwriting', 'Pixel art', 'Music composition', 'Sound engineering', 'C++', 'JavaScript', 'HTML & CSS', 'Project management', 'Conceptual design', 'Beta testing']
  }]*/
    //projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;