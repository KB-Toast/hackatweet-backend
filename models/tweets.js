const mongoose = require('mongoose');

const tweetsSchema = mongoose.Schema({
  date: Date,
  text: String,
  trend: Array,
  numberLikes: Array,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

const Tweet = mongoose.model('tweets', tweetsSchema);

module.exports = Tweet;