const crypto = require('crypto');
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
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  }, //enum is for string values
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
      }, //only works on SAVE and CREATE, not UPDATE, cuz mongoose doesn't have access to the passwordConfirm field
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date, //for password reset
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false, //user is active by default and will not be shown in any output
  },
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

//middleware to update passwordChangedAt property
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next(); //if password is not modified or is new, return next

  this.passwordChangedAt = Date.now() - 1000; //1 sec before the token is created
  next();
});

//sth will happen before the find query is executed
userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } }); //not equal to false
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

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex'); //random string
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex'); //encrypted token
  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 mins
  return resetToken;
};

const User = mongoose.model('User', userSchema); //model variable name is capitalized like User!

module.exports = User;
