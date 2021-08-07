const { User } = require('../models');
const { newToken } = require('../auxiliarFunctions/jwtFunctions');

const createUser = async (user) => {
  const checkUser = await User.findOne({ where: { email: user.email } });
  if (checkUser) {
    const err = new Error('User already registered');
    err.status = 409;
    throw err;
  }
  const { dataValues: newUser } = await User.create(user);
  delete newUser.password;
  return newToken(newUser);
};

module.exports = {
  createUser,
};
