const jwt = require('jsonwebtoken');

const { tokenNotFoundError, invalidTokenError } = require('../../util/errorsMessages');

const secret = 'issoehsegredo';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw tokenNotFoundError;

  try {
    const decoded = jwt.verify(token, secret);
    const user = decoded.data;
    req.user = user;
  
    next();
  } catch (error) {
    throw invalidTokenError;
  }
};

module.exports = validateToken;