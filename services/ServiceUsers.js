const RepositoryUsers = require('../repository/RepositoryUsers');
const { createToken } = require('../middlewares');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
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

  const { password: passBD, ...userWithoutPassword } = findUserByEmail.dataValues;
  
  const token = await createToken(userWithoutPassword);

  return { token };
};

const getAll = async () => {
  const getAllUsers = await RepositoryUsers.getAll();

  return getAllUsers;
};

const getUserById = async (id) => {
  const user = await RepositoryUsers.getUserById(id);

  if (!user) throw invalidData('User does not exist', NOT_FOUND);

  return user;
};

const deleteMe = async (id) => {
  await RepositoryUsers.deleteMe(id);
};

module.exports = {
  create,
  login,
  getAll,
  getUserById,
  deleteMe,
};
