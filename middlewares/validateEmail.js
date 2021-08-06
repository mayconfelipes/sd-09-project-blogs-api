const { User } = require('../models');

const validateEmail = async (req, _res, next) => {
  const { email } = req.body;
  const emailUser = await User.findOne({ where: { email } });
  // console.log('emailUser', emailUser);

  if (emailUser) {
    return next({ status: 409, message: 'User already registered' });
  }
  return next();
};

const existEmail = async (req, _res, next) => {
  const { email } = req.body;

  const emailLogin = await User.findOne({ where: { email } });

  if (!emailLogin) {
    return next({ status: 400, message: 'Invalid fields' });
  }
  return next();
};
module.exports = {
  validateEmail,
  existEmail,
};