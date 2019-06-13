// define the User model schema
const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  password: String,
  name: String
});

module.exports = mongoose.model('User', UserSchema);
