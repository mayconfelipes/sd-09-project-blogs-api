module.exports = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') {
    return next({
      error: {
        statusCode: 400,
        message: '"email" is not allowed to be empty',
      },
    });
  }

  if (password === '') {
    return next({
      error: {
        statusCode: 400,
        message: '"password" is not allowed to be empty',
      },
    });
  }

  next();
};