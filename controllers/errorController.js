module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //default status code
  err.status = err.status || 'error'; //default status
  res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
  });
};
