const { Users } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const findUser = await Users.findOne({ where: { email } });

  if (findUser) return { code: 409, message: 'User already registered' };

  const newUser = await Users.create({ displayName, email, password, image });

  return newUser.dataValues;
};

module.exports = {
  createUser,
}