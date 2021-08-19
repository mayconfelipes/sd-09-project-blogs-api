const { User } = require('../models');

const validateUserExists = async (req, res, next) => {
  const { email } = req.body;
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    return res
      .status(409)
      .json({ message: 'User already registered' });
  }
  next();
};

module.exports = validateUserExists;
