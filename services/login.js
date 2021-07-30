const { User } = require('../models');

const login = async ({ email, password }) => {
  const foundUser = await User.findOne({ where: { email, password } });

  if (!foundUser) {
    return {
      error: { statusCode: 400, message: 'Invalid fields' },
    };
  }

  return foundUser.dataValues;
};

module.exports = {
  login,
};
