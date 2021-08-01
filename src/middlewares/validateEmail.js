module.exports = (req, _res, next) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!req.body.email) {
    return next({
      error: {
        statusCode: 400,
        message: '"email" is required',
      },
    });
  }

  if (!emailRegex.test(req.body.email)) {
    return next({
      error: {
        statusCode: 400,
        message: '"email" must be a valid email',
      },
    });
  }

  next();
};
