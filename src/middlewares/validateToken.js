const jwt = require('jsonwebtoken');
require('dotenv');

const UserService = require('../services/UserServices');

const { HTTP_UNAUTHORIZED_STATUS } = require('../helpers/statusProtocoloHTTP');

const { SECRET } = process.env;

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'Token not found' });

  try {
    const payload = jwt.verify(token, SECRET);
    // verify se  o que vem no retorno em caso de token inválido
    if (!payload) return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'Expired or invalid token' });
    
    const user = await UserService.findByEmail(payload.email);
    if (!user) return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'invalid user' });
    req.user = user;
  
    next();
  } catch (error) {
    return next({ status: HTTP_UNAUTHORIZED_STATUS, err: error.message });
  }
};
