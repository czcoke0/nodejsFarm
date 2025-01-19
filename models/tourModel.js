const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
//everything not in schema will be ignored
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a name'],
      unique: true,
      maxLength: [40, 'A tour name must have less or equal than 40 characters'],
      minLength: [10, 'A tour name must have more or equal than 10 characters'],
      //validate: [validator.isAlpha, 'Tour name must only contain characters'], //validator is a library- just demo
    },
    slug: String, //slug is a string that is part of the url
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
      max: [31, 'A tour duration must be less than 31 days'],
      min: [1, 'A tour duration must be more than 1 day'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    pricecDiscount: {
      type: Number,
      validate: function (val) {
        //this - only points to current doc on NEW document creation
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below the price',
    },
    summary: {
      type: String,
      trim: true, //trim only works for strings
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
    secretTour: {
      type: Boolean,
      default: false,
    }, //this is a field that is not in the schema, so it will be ignored
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
); //to include virtual properties in the output

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7; //this refers to the current document, and virtual properties are not stored in the database
});

//define middleware in schema, runs before .save() and .create(); below is called pre save hook
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//query middleware
//^find= all strings that start with find
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); //not equal to true
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  console.log(docs);
  next();
});

//aggregation middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
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
