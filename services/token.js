const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { status, message } = require('./statusMessages');

const createToken = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);
  // console.log(token);

  req.token = token;

  return next();
};

module.exports = { createToken };