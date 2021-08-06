const { User } = require('../models');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailUser = await User.findOne({ where: { email } });
  console.log('emailUser', emailUser);

  if (emailUser) {
    return next({ status: 409, message: 'User already registered' });
  }
  return next();
};

module.exports = validateEmail;