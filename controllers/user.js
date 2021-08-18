const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = 'nesngamedev';

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const insertUser = async (request, response) => {
  try {
    const { displayName, email, password, image } = request.body;
    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ email }, SECRET, jwtConfig);
    response.status(201).json(token);
  } catch (error) {
    console.log(error);
    response.status(500).json('insertUser error');
  }
};

module.exports = {
  insertUser,
}; 