const { User } = require('../models');

const addUser = async (newUser) => {
  const { displayName, email, password, image } = newUser;

  const conflict = await User.findOne({ where: { email } });

  if (conflict) return { message: 'User already registered', statusCode: 409 };

  const user = await User.create({ displayName, email, password, image });

  return user;
};

module.exports = {
  addUser,
};
