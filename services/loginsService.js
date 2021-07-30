const { generateToken } = require('./utils/tokenValidate');
const { isValidLogin } = require('./utils/loginsValidate');

const login = async (user) => {
  await isValidLogin(user);
  const token = generateToken(user);
  const result = { token };
  return result;
};

module.exports = {
  login,
};