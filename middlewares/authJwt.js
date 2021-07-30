const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) next({ statusCode: 401, message: 'Token not found' });
    const data = jwt.verify(token, secret);
    
    const user = await User.findOne({
      where: { email: data.email },
      attributes: { exclude: ['password'] },
    });

    req.user = user.dataValues;
    next();
  } catch (error) {
    return next({ statusCode: 401, message: 'Expired or invalid token' });
  }
};
