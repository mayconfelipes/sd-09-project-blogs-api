module.exports = (req, res, next) => {
  if (!req.body.name) {
    return next({
      error: {
        statusCode: 400,
        message: '"name" is required',
      },
    });
  }

  next();
};