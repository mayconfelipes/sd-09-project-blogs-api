const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = 'jwtSenha';

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const insertUser = async (request, response) => {
  try {
    const { displayName, email, password, image } = request.body;
    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ email }, SECRET, jwtConfig); // cria o token
    // console.log(`Imprimindo valor de token em user/controller ${token}`);
    response.status(201).json(token);
  } catch (error) {
    console.log(error);
    response.status(500).json('Erro da função insertUser do Controller');
  }
};

module.exports = {
  insertUser,
};