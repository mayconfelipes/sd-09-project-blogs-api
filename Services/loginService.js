const Schema = require('../Utils/schemas');
const ValidateError = require('../Utils/validateError');

const validateLogin = async (loginData) => {
  const { error } = Schema.login.validate(loginData);

  if (error) throw ValidateError(400, error.message);
  return true;
};

module.exports = validateLogin;
