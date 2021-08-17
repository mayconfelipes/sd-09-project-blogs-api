const { User } = require('../models');

const validateEmail = async (email, res) => {
  if (!email) {
    return res
    .status(400)
    .json({ message: '"email" is required' });
  }
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const exists = await User.findOne({ where: { email } });
  if (!validation) {
    return res
        .status(400)
        .json({ message: '"email" must be a valid email' }); 
  } 
  if (exists) {
    return res
      .status(409)
      .json({ message: 'User already registered' });
  }
};

module.exports = validateEmail;