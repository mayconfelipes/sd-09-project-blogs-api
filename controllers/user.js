const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');
const userService = require('../services/user');

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

const listUsers = rescue(async (request, response) => {
    const users = await userService.listUsers();
    console.log(`Imprimindo o valor de users/controllers ${users}`);
    return response.status(200).json(users);
});

module.exports = {
  insertUser,
  listUsers,
};