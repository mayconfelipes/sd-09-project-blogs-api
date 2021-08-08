const errorMessages = require('../utils/errorMessages');
const codes = require('../utils/RestCodes');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.code) return res.status(codes[err.code]).json({ message: errorMessages[err.message] });
  return res.status(500).json(err);
};

module.exports = errorMiddleware;
