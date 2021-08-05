const { code } = require('../helpers/messages');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.isJoi) {
    res.status(code.BAD_REQUEST).send({
      error: { message: err.details[0].message },
    });
  }
  if (err.status) {
    res.status(err.status).send({
      error: err.message,
    });
  }
  res.status(code.SERVER_ERROR).send({
    error: err.message,
  });
};

module.exports = errorMiddleware;