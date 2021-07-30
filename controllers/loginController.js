const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const services = require('../services');

const secret = process.env.JWT_SECRET;

const login = rescue(async (req, res, _next) => {
  const user = await services.login(req.body);
  const { displayName, email } = user;

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ displayName, email }, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = {
  login,
};
