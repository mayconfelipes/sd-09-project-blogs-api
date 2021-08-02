const jwt = require('jsonwebtoken');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
    const missing = { status: 401, message: 'Token not found' };
    next(missing);
  }
  const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
  req.user = decoded.userInfo;
  return next();
  } catch (err) {
    const error = { status: 401, message: 'Expired or invalid token' };
      throw error;
  }
};

module.exports = validateToken;