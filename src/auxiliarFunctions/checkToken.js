const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);

    return userData;
  } catch (error) {
    return error;
  }
};

module.exports = checkToken;