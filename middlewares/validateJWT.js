const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { unauthorized } = require('../utils/httpStatusCodes');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(unauthorized).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { email } = decoded.data;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(unauthorized).json({ message: 'Expired or invalid token' });
    }
    
    const { dataValues: { id } } = user;

    req.userId = id;

    next();
  } catch (err) {
    return res.status(unauthorized).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;
