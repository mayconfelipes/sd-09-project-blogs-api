const errorMiddleware = (error, _req, res, _next) => {
  const genericNumberError = 500;
  const { status } = error;
  const statusCode = status || genericNumberError;
  // delete error.err.status;
  res.status(statusCode).json(error.message);
};

module.exports = { errorMiddleware };
