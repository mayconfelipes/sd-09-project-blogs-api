const { User } = require('../models');
const { auth } = require('../utils');

const findByEmail = async (email) => User.findOne({ where: { email } });

const create = async ({ displayName, email, password, image }) => {
  const userExists = await findByEmail(email);
  if (userExists) return { error: { type: 'userExists' } };
  await User.create({ displayName, email, password, image });
  const token = auth.createToken({ displayName, email });
  return { token };
};

module.exports = {
  create,
};
