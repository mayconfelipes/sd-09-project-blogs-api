const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const tokenValidate = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    await jwt.verify(authorization, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidate;
