const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || token.length === 0) {
      throw new CustomError('invalidToken', 'Token not found');
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      throw new CustomError('invalidToken', 'Expired or invalid token');
    }
  } catch (err) {
    next(err);
  }
};
