const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  userName: String,
  password: String,
  token: String,
  img: String
});

const User = mongoose.model('users', userSchema);

module.exports = User