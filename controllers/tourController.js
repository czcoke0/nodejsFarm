//handlers are controller functions
const Tour = require('./../models/tourModel');

const getAllTours = (req, res) => {
  console.log('req.requestTime', req.requestTime);
  // res.status(200).json({
  //   status: 'success',
  //   requestedAt: req.requestTime,
  //   results: tours.length,
  //   data: {
  //     tours,
  //   },
  // });
};

const getTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id); //change a string to number
  console.log(req.params);

  // const id = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
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
const updateTour = (req, res) => {
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: '<Updated tour here...>',
  //       },
  //     });
  //   },
  // );
};

const deleteTour = (req, res) => {
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(204).json({
  //       status: 'success',
  //       data: null,
  //     });
  //   },
  // );
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
