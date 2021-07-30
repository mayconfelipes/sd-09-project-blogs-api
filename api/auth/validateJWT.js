const jwt = require('jsonwebtoken');
const { User } = require('../../models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ status: 401, message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) return next({ status: 401, message: 'User not found' });

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return next({ status: 401, message: 'Expired or invalid token' });
  }
};