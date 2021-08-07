const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const secret = 'RodrigoNeoSuperEx';
  const { authorization: token } = req.headers;
  if (!token) return next({ status: 401, message: 'Token not found' });
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    next({ status: 401, message: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };
