const { User } = require('../models');
const getToken = require('../middlewares/generateToken');
const { userExists } = require('../middlewares/validators');
const schemas = require('../middlewares/schemas');

const create = async (userInfo) => {
  const { email } = userInfo;
  try {
    await schemas.userSchema(userInfo);
    await userExists(email);
  } catch (error) {
    return error;
  }
  const newUser = await User.create(userInfo);
  const { token } = await getToken.generateToken(newUser);
  return {
    status: 201,
    token,
  };
};

module.exports = { create };