const userModels = require('../models/userModels');
const generateError = require('../auxiliarFunctions/generateError');
const createToken = require('../auxiliarFunctions/createToken');

const postNewUser = async (userData) => {
  const result = await userModels.postNewUser(userData);

  if (!result) throw (generateError('conflict', 'User already registered'));

  const { password, ...tokenData } = userData;
  
  const token = createToken(tokenData);

  return { token };
};

module.exports = {
  postNewUser,
};
