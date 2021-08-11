const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');

const SECRET = 'jwtSenha';

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const login = rescue(async (request, response) => {
    const { email } = request.body;
    const userLogged = await User.findOne({ where: { email } });
    if (!userLogged) response.status(400).json({ message: 'Invalid fields' });

    const token = jwt.sign({ email }, SECRET, jwtConfig);
    response.status(200).json(token); // se existir retorna o token
});

module.exports = {
  login,
};