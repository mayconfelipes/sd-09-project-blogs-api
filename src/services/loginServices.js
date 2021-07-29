const loginModels = require('../models/loginModels');
const generateError = require('../auxiliarFunctions/generateError');
const createToken = require('../auxiliarFunctions/createToken');

const loginUser = async ({ email, password }) => {
  const result = await loginModels.loginUser({ email, password });

  if (!result) throw generateError('badRequest', 'Invalid fields');
  
  const { password: userPassword, ...tokenData } = result.dataValues;

  const token = createToken(tokenData);

  return token;
};

module.exports = {
  loginUser,
};
