const jwt = require('jsonwebtoken');
require('dotenv/config');

const { unauthorized, notFound } = require('../helpers/getHttpStatusCode');
const userServices = require('../services/userServices');

const { JWT_SECRET } = process.env;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(unauthorized).json({ message: 'Token not found' });

  try {
    console.log('[token] > ', token);
    console.log('[secret] > ', JWT_SECRET);
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await userServices.findOne(payload.email);

    if (!user) return res.status(notFound).json({ message: 'User not Found' });

    req.user = payload;

    next();
  } catch (err) {
    console.log('[err token validation] > ', err.message);
    return res.status(unauthorized).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };
