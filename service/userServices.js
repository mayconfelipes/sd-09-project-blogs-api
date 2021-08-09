const { User } = require('../models');

module.exports = {
  checkingLogin: async (email, password) => {
    const userExists = await User.findOne({ where: { email, password } });
    if (!userExists) return { statusCode: 400, message: 'Invalid fields' };

    return userExists.dataValues;
  },
};
