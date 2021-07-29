const checkToken = require('../auxiliarFunctions/checkToken');
const generateError = require('../auxiliarFunctions/generateError');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(generateError('unauthorized', 'Token not found'));

  const check = checkToken(token);
  if (!check.data) return next(generateError('unauthorized', 'Expired or invalid token'));
  
  next();
};

module.exports = validateToken;
