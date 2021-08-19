const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');

const SECRET = 'nesngamedev';

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const insertUser = rescue(async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ email }, SECRET, jwtConfig);
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json('insertUser error');
  }
});

const logUser = rescue(async (req, res) => {
  const { email } = req.body;
  const userLogged = await User.findOne({ where: { email } });
  if (!userLogged) res.status(400).json({ message: 'Invalid fields' });

  const token = jwt.sign({ email }, SECRET, jwtConfig);
  res.status(200).json({ token });
});

const listAllUsers = rescue(async (_req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
});

const deleteUser = rescue(async (req, res) => {
  const { email } = req.user;
  const { id } = await User.findOne({ where: { email } });
  await User.destroy({ where: { id } });
  return res.status(204).json();
});

module.exports = {
  insertUser,
  logUser,
  listAllUsers,
  SECRET,
  getUserById,
  deleteUser,
}; 