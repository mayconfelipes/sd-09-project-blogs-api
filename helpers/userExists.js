const { User } = require('../models');
const response = require('./response');

const userExists = async (userEmail) => {
  try {
    const findOne = await User.findOne({ where: { email: userEmail } });
    if (findOne) return response(409, 'User already registered');
    return {
      status: 200,
      message: 'validated',
    };
  } catch (error) {
    return response(500, error.message);
  }
};

module.exports = userExists;
