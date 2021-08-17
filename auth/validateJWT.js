const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'something'; 

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { email } = jwt.verify(token, secret);
    const findUser = await User.findOne({ where: { email } });
    // if (!findUser) return res.status(400).json({ message: 'User not found' });

    req.user = findUser.id;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
