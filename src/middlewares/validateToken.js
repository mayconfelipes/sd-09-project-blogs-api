const jwt = require('jsonwebtoken');
require('dotenv');

const userModel = require('../models/users');

const { HTTP_UNAUTHORIZED_STATUS } = require('../helpers/statusProtocoloHTTP');

const { SECRET } = process.env;

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'Token not found' });

  try {
    const payload = jwt.verify(token, SECRET);
    if (!payload) return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'Expired or invalid token' });
    const user = await userModel.findUser(payload.email);
    
    if (!user) return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'invalid user' });
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
  
    next();
  } catch (error) {
    return next({ status: HTTP_UNAUTHORIZED_STATUS, err: error.message });
  }
};
