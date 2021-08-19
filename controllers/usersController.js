const {
  createNewUser,
  getAllUsers,
  getUserById,
  removeUser,
} = require('../services/usersServices');
const { validateNewUser } = require('../services/userValidation');
const { validateToken } = require('../services/token');

const createUser = async (req, res, _next) => {
  const newUser = req.body;

  const invalidData = await validateNewUser(newUser);
  if (invalidData) return res.status(invalidData.status).json({ message: invalidData.message });

  const response = await createNewUser(newUser);
  return res.status(201).json(response);
};

const listAllUsers = async (req, res, _next) => {
  const token = req.headers.authorization;

  const isTokenValid = await validateToken(token);
  if (isTokenValid.status) return res.status(401).json({ message: isTokenValid.message });

  const response = await getAllUsers();
  return res.status(200).json(response);
};

const userById = async (req, res, _next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const isTokenValid = await validateToken(token);
  if (isTokenValid.status) return res.status(401).json({ message: isTokenValid.message });

  const user = await getUserById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(user);
};

const deleteOwnUser = async (req, res, _next) => {
  const token = req.headers.authorization;

  const isTokenValid = await validateToken(token);
  if (isTokenValid.status) return res.status(401).json({ message: isTokenValid.message });

  const deleteUser = await removeUser(token);
  if (deleteUser.status) return res.status(deleteUser.status).json({ message: deleteUser.message });

  return res.status(204).json();
};

module.exports = {
  createUser,
  listAllUsers,
  userById,
  deleteOwnUser,
};
