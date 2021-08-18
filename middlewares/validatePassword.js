const validatePassword = (pass, res) => {
  if (pass === '') {
    return res.status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }
  if (!pass) {
    return res
      .status(400)
      .json({ message: '"password" is required' });
  }
  if (pass.length !== 6) {
    return res
      .status(400)
      .json({ message: '"password" length must be 6 characters long' });
  }
};

module.exports = validatePassword;