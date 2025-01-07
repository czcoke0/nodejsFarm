const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); //read the config file and save it to the environment variable; order is important need to read the config file first then the app file

const app = require('./app');

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
