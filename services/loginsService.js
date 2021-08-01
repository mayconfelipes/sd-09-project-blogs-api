const { generateToken } = require('./utils/tokenValidate');
const { isValidLogin } = require('./utils/loginsValidate');

const login = async (user) => {
  const userData = await isValidLogin(user);
  const token = generateToken(userData);
  const result = { token };
  return result;
};

module.exports = {
  login,
};