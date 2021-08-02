const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = (req, _res, next) => {
  const { password, ...user } = req.body;
  const token = jwt.sign(user, SECRET, jwtConfig);

  req.token = token;

  next();
};