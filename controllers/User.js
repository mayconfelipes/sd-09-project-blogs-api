const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const User = require('../services/User');

const secret = 'dev@marts_123456';

const registerUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await User.createUser(displayName, email, password, image);

  if (newUser.message) return next(newUser);

  const user = email;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return res.status(201).json({ token });
});

module.exports = {
  registerUser,
};
