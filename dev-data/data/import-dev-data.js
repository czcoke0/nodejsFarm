const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' }); //read the config file and save it to the environment variable; order is important need to read the config file first then the app file

const DB = process.env.DATABASE;
// .replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

console.log('DATABASE:', process.env.DATABASE);

mongoose
  .connect(DB, {
    dbName: 'natours',
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err.message);
  });

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// Delete all data from DB
const deleteTours = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteTours();
}
console.log(process.argv);
