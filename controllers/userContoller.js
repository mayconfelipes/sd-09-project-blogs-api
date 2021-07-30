const { userService } = require('../services');
const validations = require('../validations');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image = null } = req.body;

  const newUser = await userService.createUser(
    displayName,
    email,
    password,
    image,
  );

  return newUser.error
    ? next(newUser)
    : res.status(201).json({ token: validations.generateToken(newUser) });
};

const getAllUsers = async (_req, res, next) => {
  const allUsers = await userService.getAllUsers();

  if (!allUsers) return next({ message: 'Algo deu muito errado' });

  return res.json(allUsers);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  return user.error ? next(user) : res.json(user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
