const jwt = require('jsonwebtoken');

const SECRET = 'segredo';
const CONFIG = { expiresIn: '15min' };

const verifyErrorMessage = (message) => {
  switch (message) {
    case 'jwt must be provided':
      return 'Token not found';
    case 'jwt expired':
      return 'Expired or invalid token';
    case 'invalid token':
      return 'Expired or invalid token';
    case 'jwt malformed':
      return 'Expired or invalid token';
  default:
    return message;
  }
}; 

const sign = (payload) => jwt.sign(payload, SECRET, CONFIG);
const verify = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    console.log(verifyErrorMessage(err.message));
    return { error: { name: err.name, message: verifyErrorMessage(err.message) } };
  }
 };

module.exports = {
  sign,
  verify,
};
