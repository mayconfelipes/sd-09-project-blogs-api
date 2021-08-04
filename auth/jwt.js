const jwt = require('jsonwebtoken');

const SECRET = 'segredo';
const CONFIG = { expiresIn: '15min' };

const sign = (payload) => jwt.sign(payload, SECRET, CONFIG);
const verify = (token) => jwt.verify(token, SECRET);

module.exports = {
  sign,
  verify,
};
