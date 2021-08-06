const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const user = async (userData) => {
  const newUser = await User.create(userData);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: newUser }, secret, jwtConfig);
  return token; 
};

const findAllUsers = async () => User.findAll();

module.exports = { user, findAllUsers };
