const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log(req.query);
  res.status(200).send('Hello World');
});

app.post('/', (req, res) => {
  res.status(200).send('pls post to this url');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log('jfjsldj');
console.log('jkldfjflksjf');
