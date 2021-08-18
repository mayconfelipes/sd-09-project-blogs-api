const { User } = require('../models');

const login = async (userData) => {
  const { email, password } = userData;

  const confirmation = await User.findOne({ where: { email, password } });

  if (!confirmation) return { message: 'Invalid fields', statusCode: 400 };

  return confirmation;
};

module.exports = login;
