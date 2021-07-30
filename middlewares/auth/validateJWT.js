require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = (callback) => async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ error: { message: 'Token not found', code: 'missingAuth' } });

  try {
    const decoded = jwt.verify(token, secret);

    const AllUsers = await callback();

    const userJWT = AllUsers.find((user) => user.email === decoded.data.email);

    if (!userJWT) {
      return next({ error: { message: 'Expired or invalid token', code: 'expiredToken' } });
    }

    req.user = decoded.data;
    next();
  } catch (err) {
    return next({ error: { message: 'Expired or invalid token', code: 'expiredToken' } });
  }
};
