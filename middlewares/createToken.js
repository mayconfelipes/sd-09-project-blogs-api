const jwt = require('jsonwebtoken');

const { SECRET } = require('../utils');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (req, res, next) => {
  const { user } = req;

  const token = jwt.sign(user, SECRET, jwtConfig);

  req.token = token;

  next();
};

module.exports = createToken;
