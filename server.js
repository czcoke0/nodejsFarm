const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //read the config file and save it to the environment variable; order is important need to read the config file first then the app file
const app = require('./app');

const DB = process.env.DATABASE;
// .replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

console.log('DATABASE:', process.env.DATABASE);

mongoose
  .connect(DB, {
    dbName: 'natours',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err.message);
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Sea Explorer',
  price: 1200,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
