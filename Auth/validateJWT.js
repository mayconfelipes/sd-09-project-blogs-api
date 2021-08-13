const jwt = require('jsonwebtoken');
require('dotenv');
const { User } = require('../models');

const SECRET_KEY = process.env.SECRET_KEY || 'evaluetor';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || token === undefined) {
      return res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(token, SECRET_KEY, (err, _decoded) => {
      if (err) throw Error('Expired or invalid token');
    });

    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await User.findOne({ where: { email: decoded.data.email } });
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};