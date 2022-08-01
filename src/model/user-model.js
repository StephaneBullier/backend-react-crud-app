const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    lastname: { type: String, require: true, trim: true },
    firstname: { type: String, require: true, trim: true },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: { type: String, require: true, trim: true, minLength: 7 },
    userType: {
      type: String,
      enum: ['Administrateur', 'Commercial'],
      require: true,
    },
    isActivated: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
