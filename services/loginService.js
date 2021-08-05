const status = require('../status/status');

const verifyFields = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(status.BAD_REQUEST).json({ message: '"email" is required' });
  }
  if (!password) {
    return res.status(status.BAD_REQUEST).json({ message: '"password" is required' });
  }
  next();
};

const verifyEmptyFields = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') {
    return res.status(status.BAD_REQUEST)
    .json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(status.BAD_REQUEST)
    .json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

module.exports = {
  verifyFields,
  verifyEmptyFields,
};