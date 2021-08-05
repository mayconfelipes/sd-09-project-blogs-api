const validateLoginData = require('../validateLoginData');
const { createToken } = require('../../middlewares/Auth/jwt');

module.exports = async (loginData) => {
  await validateLoginData(loginData);

  const token = await createToken(loginData);

  return token;
};
