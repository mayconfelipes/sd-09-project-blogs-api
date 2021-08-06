const { User } = require('../models');
const token = require('../middlewares/generateToken');
const { userExists } = require('../middlewares/validators');

const create = async (userInfo) => {
  const { email } = userInfo;
  try {
    await userExists(email);
  } catch (error) {
    return error;
  }
  const newUser = await User.create(userInfo);
  const userToken = await token.generateToken(newUser);
  return {
    status: 201,
    userToken,
  };
};

module.exports = { create };