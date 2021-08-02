const statusCode = require('../statusCodes');

module.exports = (err, _req, res, _next) => {
  if (err.error) {
    return res.status(statusCode[err.error.code]).json({
       message: err.error.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};