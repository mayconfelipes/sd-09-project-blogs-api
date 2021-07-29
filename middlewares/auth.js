const jwt = require('jsonwebtoken');
const models = require('../models');

const secret = process.env.JWT_SECRET;

const createToken = async ({ email }) => {
try {
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

return jwt.sign({ data: email }, secret, jwtConfig);
} catch (error) {
// console.error(error);
}
};

const getToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
  //  console.log(token);
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const decode = jwt.verify(token, secret);
    const user = await models.Users.findOne({ where: { email: decode.data.email } });
  //  console.log(user);
   if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
   req.userId = user.id;
    next();
  } catch (error) {
   // console.log(error)
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createToken,
  getToken,
};