const jwt = require('jsonwebtoken');

const secret = 'projectBlogApi';
const config = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (email) => {
  const token = jwt.sign({ user: { email } }, secret, config);
  return token;
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = {
  createToken,
  validateToken,
};
