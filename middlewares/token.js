require('dotenv').config();

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const config = { algorithm: 'HS256', expiresIn: '1d' };

const UNAUTHORIZED_STATUS = 401;

const createToken = (email) => {
  const token = jwt.sign({ user: { email } }, SECRET, config);
  return token;
};

const validateToken = async (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    const message = 'Token not found';
    return response.status(UNAUTHORIZED_STATUS).json({ message });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    request.user = decoded.user;
    return next();
  } catch (err) {
    console.log(err);
    const message = 'Expired or invalid token';
    return response.status(UNAUTHORIZED_STATUS).json({ message });
  }
};

module.exports = {
  createToken,
  validateToken,
};
