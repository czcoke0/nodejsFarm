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

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
