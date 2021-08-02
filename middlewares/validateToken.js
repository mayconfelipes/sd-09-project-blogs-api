require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: async (req, _res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return next({ statusCode: 401, message: 'Token not found' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      const { password: _, ...withoutPassword } = payload;

      req.user = withoutPassword;

      next();
    } catch (err) {
      return next({ statusCode: 401, message: 'Expired or invalid token' });
    }
  },
};
