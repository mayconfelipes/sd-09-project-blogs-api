const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');

const SECRET = 'jwtSenha';

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const insertUser = rescue(async (request, response) => {
    const { displayName, email, password, image } = request.body;
    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ email }, SECRET, jwtConfig); // cria o token
    // console.log(`Imprimindo valor de token em user/controller ${token}`);
    response.status(201).json(token);
  });

module.exports = {
  insertUser,
};