const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

//checkID middleware
const checkUser = (req, res, next, val) => {
  console.log(`user id is: ${val}`);

  if (req.params.user * 1 > user.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid user',
    });
  }
  next();
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkUser,
};
