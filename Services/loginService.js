const Schema = require('../Utils/schemas');
const ValidateError = require('../Utils/validateError');
const { User } = require('../models');

const validateLogin = async (loginData) => {
  const { error } = Schema.login.validate(loginData);
  if (error) throw ValidateError(400, error.message);

  const user = await User.findOne({ where: { email: loginData.email } });
  if (!user) throw ValidateError(400, 'Invalid fields');

  return true;
};

module.exports = validateLogin;
