//handlers are controller functions
const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    // const tours = await Tour.find({
    //   duration: 599,
    //   difficulty: 'easy',
    // });
    //Build the query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields']; //fields that are not part of the query
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(req.query, queryObj); //{ duration: '5', page: '1' } { duration: '5' }

    //solution
    const query = Tour.find(req.query);

    //Execute the query
    const tours = await query;
    //send response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
    console.log(req.params);
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body); //tour.create is a promise

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
