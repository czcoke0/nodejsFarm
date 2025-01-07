const app = require('./app');
const port = 3000;
console.log(process.env);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
