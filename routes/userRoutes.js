const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.param('id', checkUser);

router.post('/signup', authController.signup); //signup is specific to authController, not related to userController endpoints. signup only needs post method
router.post('/login', authController.login); //login is specific to authController, not related to userController endpoints. login only needs post method- to send login credentials to the backend

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMe', authController.protect, updateMe);
router.delete('/deleteMe', authController.protect, deleteMe);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
