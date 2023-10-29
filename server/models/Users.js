const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
