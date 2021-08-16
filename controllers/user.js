const rescue = require('express-rescue');
const {
  checkNewUser,
  getUser,
  createUser,
  findUsers,
  findUserById,
  deleteUser,
} = require('../services/user');

const newUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const { error } = checkNewUser({ displayName, email, password, image });
  if (error) return res.status(400).json(error.details[0]);

  const user = await getUser(email);
  if (user) return res.status(409).json({ message: 'User already registered' });

  const created = await createUser({ displayName, email, password, image });
  if (created.err) return res.status(500).json({ message: created.err.message });

  return res.status(201).json({ token: req.token });
});

const getUsers = rescue(async (req, res) => {
  const users = await findUsers();
  return res.status(200).json(users);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(user);
});

const deleteMe = rescue(async (req, res) => {
  const { user: { id } } = req;
  await deleteUser(id);
  return res.status(204).end();
});

module.exports = { newUser, getUsers, getUserById, deleteMe };