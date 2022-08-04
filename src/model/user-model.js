const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
  {
    lastname: { type: String, required: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalided');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    userType: {
      type: String,
      enum: ['Administrateur', 'Commercial'],
      required: true,
    },
    isActivated: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
