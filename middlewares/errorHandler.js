const StatusCode = require('../util/statusCode');

const errorHandler = (err, _req, res, _next) => {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }

  return res.status(StatusCode.internalServerError).json();
};

module.exports = errorHandler;