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
  res.status(200).json(token);
});

module.exports = {
  insertUser,
  logUser,
}; 