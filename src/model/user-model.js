const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  lastname: { type: String, require: true },
  firstname: { type: String, require: true },
  email: { type: String, require: true },
  password: 'password',
  userType: { type: String, require: true },
  isActivated: { type: Boolean },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
