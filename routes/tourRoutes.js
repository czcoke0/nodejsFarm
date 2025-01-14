const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTopTours,
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id');
//this is a middleware that only runs for the route with /api/v1/tours, not users!
router.route('/top-5-cheap').get(getTopTours, getAllTours);
router.route('/').get(getAllTours).post(createTour); // the route is the root
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
