const checkPassword = (req, res, next) => {
  const { password } = req.body;
  const MIN_LENGTH_PASSWORD = 6;

  if (!password) {
    return res.status(400).send({
      message: '"password" is required',
    });
  }

  if (password.length < MIN_LENGTH_PASSWORD) {
    return res.status(400).send({
        message: '"password" length must be 6 characters long',
    });
  }
  return next();
};

module.exports = checkPassword;
