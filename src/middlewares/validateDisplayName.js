module.exports = (req, _res, next) => {
  const { displayName } = req.body;

  if (typeof displayName !== 'string' || displayName.length < 8) {
    return next({
      error: {
        statusCode: 400,
        message: '"displayName" length must be at least 8 cheracters long',
      },
    });
  }

  next();
};
