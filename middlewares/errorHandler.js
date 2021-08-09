const httpStatusCode = require('../utils/httpStatusCodes');

const errorHandler = (err, _req, res, _next) => {
  if (err.isJoi) {
    const { details } = err;
    return res.status(httpStatusCode.badRequest).json({ message: details[0].message });
  }

  if (err.code) {
    const { code, message } = err;
    return res.status(httpStatusCode[code]).json({ message });
  }

  console.log(err);

  return res.status(httpStatusCode.internalServerError).json({
      message: 'Oooops D:', 
  });
};

module.exports = errorHandler;
