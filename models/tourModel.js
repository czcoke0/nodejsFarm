const mongoose = require('mongoose');

//everything not in schema will be ignored
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  pricecDiscount: Number,
  summary: {
    type: String,
    trim: true, //trim only works for strings
    required: [true, 'A tour must have a summery'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  iamges: [String],
  createAt: {
    type: Date,
    default: Date.now(),
    select: false, //hide this field from the output api
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//   name: 'The Sea Explorer',
//   price: 1200,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
module.exports = Tour;
