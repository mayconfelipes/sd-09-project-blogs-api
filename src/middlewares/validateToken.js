const jwt = require('jsonwebtoken');
require('dotenv');

const UserService = require('../services/UsersServices');

const { HTTP_UNAUTHORIZED_STATUS } = require('../helpers/statusProtocoloHTTP');

const { JWT_SECRET } = process.env;

const validateToken = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'Token not found' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await UserService.findByEmail(payload.email);
    if (!user) return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'invalid user' });
    req.user = user;
  
    next();
  } catch (error) {
    return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };