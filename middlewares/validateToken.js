const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const validToken = jwt.verify(token, secret);
    const { id } = validToken.data.dataValues;
    const user = await userService.getUserById(id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;