const jwt = require('jsonwebtoken');
const { getUserByField } = require('../routes/user/models/user');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign({ ...data }, secret, jwtConfig);

const decrypted = (token) => jwt.verify(token, secret);

const tokenAuth = async (token) => {
  if (!token) return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'nonexistentToken' };

  try {
    const { email } = decrypted(token);
    
    const user = await getUserByField('email', email);

    if (!user) return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'invalidToken' };

    return user;
  } catch (error) {
    return { error: true, code: 'STATUS_UNAUTHORIZED', message: 'invalidToken' };
  }
};

module.exports = {
  generateToken,
  tokenAuth,
};
