const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id');
//this is a middleware that only runs for the route with /api/v1/tours, not users!
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/top-5-cheap').get(getTopTours, getAllTours);
router.route('/').get(getAllTours).post(createTour); // the route is the root
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
