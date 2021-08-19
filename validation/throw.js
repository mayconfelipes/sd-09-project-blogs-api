const throwError = (err, statusCode, message = '') => {
  const error = err;
  if (error.isJoi) {
    error.statusCode = statusCode;
    throw error;
  }
  error.statusCode = statusCode;
  error.message = message;
  throw error;
};

module.exports = {
  throwError,
};