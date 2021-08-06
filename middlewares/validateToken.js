const jwt = require('jsonwebtoken');
require('dotenv/config');

const { unauthorized } = require('../helpers/getHttpStatusCode');

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(unauthorized).json({ message: 'Token not found' });

    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    console.log('validation token');

    return next();
  } catch (err) {
    return res.status(unauthorized).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };
