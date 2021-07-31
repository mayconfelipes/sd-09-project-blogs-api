const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const error = {
      code: 401,
      message: 'Token not found',
    };
    return next(error);
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = Users.findOne({ where: { id: payload.id } });
    if (!user) next({ code: 401, message: 'Expired or invalid token' });
    next();
  } catch (error) {
    return next({ code: 401, message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;