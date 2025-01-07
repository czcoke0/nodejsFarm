const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(morgan('dev')); //middleware, to log the request
app.use(express.json()); //milddleware, to loh the body data

app.use(express.static(`${__dirname}/public`)); //middleware, to serve static files, like html, css, js

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours); //same as below
// app.get('/api/v1/tour/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter); //middleware, only run for the route with /api/v1/tours
app.use('/api/v1/users', userRouter);

module.exports = app;
