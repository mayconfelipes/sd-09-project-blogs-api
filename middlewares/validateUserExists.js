 const { User } = require('../models');

 const validateUserExists = async (email, res) => {
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    return res
      .status(409)
      .json({ message: 'User already registered' });
  }
};

module.exports = validateUserExists;
