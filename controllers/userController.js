const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const user = await UserService.create(displayName, email, password, image);

  if (user.code) return next(user);

  const token = jwt.sign(user, process.env.JWT_SECRET, jwtConfig);

  return res.status(201).json({ token });
};

module.exports = {
  create,
  
};