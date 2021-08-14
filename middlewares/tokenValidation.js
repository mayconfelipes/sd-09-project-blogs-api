const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    const { email } = payload.data;
    const userInfo = await User.findOne({ where: { email } });
    const userId = userInfo.dataValues.id;

  req.user = userId;
  } catch (e) {
    return res.status(401).send({ message: 'Expired or invalid token' });
  } 
  return next();
};

module.exports = tokenValidation;
