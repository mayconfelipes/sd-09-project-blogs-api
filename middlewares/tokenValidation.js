const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateUserData = (code, message) => ({ code, message });

async function userValidate(req, _res, next) {
  const token = req.headers.authorization;
  if (!token) {
    next(validateUserData(401, 'Token not found'));
  }
  try {
    const decoded = jwt.verify(token, secret);
    const { _id: id } = decoded;

    req.userId = id;
  } catch (_err) {
    next(validateUserData(401, 'Expired or invalid token'));
  }
  next();
}

module.exports = {
  userValidate,
}; 