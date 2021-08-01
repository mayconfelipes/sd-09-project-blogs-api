module.exports = (req, res, next) => {
  if (!req.body.password) {
    return next({
      error: {
        statusCode: 400,
        message: '"password is required"',
      },
    });
  }

  if (req.body.password.length < 6) {
    return next({
      error: {
        statusCode: 400,
        message: '"password" length must be 6 cheracters long',
      },
    });
  }
};
