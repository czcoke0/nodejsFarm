const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'], //validator is a library- just demo
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, //password will not be shown in any output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      }, //only works on SAVE and CREATE, not UPDATE
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date, //for password reset
});

//between getting the data and saving it to the database-mw
userSchema.pre('save', async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified('password')) return next(); //if password is not modified or is new, return next

  //hash the password
  this.password = await bcrypt.hash(this.password, 12); //12 is the cost, avg is 10
  console.log('password:', this.password);
  //delete passwordConfirm field, just required for validation
  this.passwordConfirm = undefined;
  next();
});

//instance method- available on all documents of a certain collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  const hashedPassword = await bcrypt.hash(candidatePassword, 12); //12 is the cost, avg is 10
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp; //if password is changed after token is issued
  }
  //false means not changed
  return false;
};

const User = mongoose.model('User', userSchema); //model variable name is capitalized like User!

module.exports = User;
