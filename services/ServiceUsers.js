const RepositoryUsers = require('../repository/RepositoryUsers');
const { createToken } = require('../middlewares');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const create = async ({ displayName, email, password, image }) => {
  const findEmail = await RepositoryUsers.getByEmail({ email });

  if (findEmail) throw invalidData('User already registered', CONFLICT);

  const createdUser = await RepositoryUsers.create({ displayName, email, password, image });

  const { password: passBD, ...userWithoutPassword } = createdUser;

  const token = await createToken(userWithoutPassword);

  return token;
};

const login = async ({ email, password }) => {
  const findUserByEmail = await RepositoryUsers.getByEmail({ email });

  if (!findUserByEmail || findUserByEmail.password !== password) {
    throw invalidData('Invalid fields', BAD_REQUEST);
  }

  const { password: passBD, ...userWithoutPassword } = findUserByEmail;

  const token = await createToken(userWithoutPassword);

  return { token };
};

const getAll = async () => {
  const getAllUsers = await RepositoryUsers.getAll();

  return getAllUsers;
};

module.exports = {
  create,
  login,
  getAll,
};
