const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkUser,
} = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.param('id', checkUser);

router.post('/signup', authController.signup); //signup is specific to authController, not related to userController endpoints. signup only needs post method

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
