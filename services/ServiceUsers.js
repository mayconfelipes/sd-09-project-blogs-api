const RepositoryUsers = require('../repository/RepositoryUsers');
const { createToken } = require('../middlewares');
const invalidData = require('../utils/invalidData');

const CONFLICT = 409;

const create = async ({ displayName, email, password, image }) => {
  const findEmail = await RepositoryUsers.getByEmail({ email });

  if (findEmail) throw invalidData('User already registered', CONFLICT);

  const createdUser = await RepositoryUsers.create({ displayName, email, password, image });

  const { password: passBD, ...userWithoutPassword } = createdUser;

  const token = await createToken(userWithoutPassword);

  return token;
};

module.exports = {
  create,
};
