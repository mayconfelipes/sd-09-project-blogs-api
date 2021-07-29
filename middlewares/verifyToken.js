const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    return {
      message: 'Expired or invalid token',
    };
  }
};

module.exports = verifyToken;
