const jwt = require('jsonwebtoken');
const { messages, codes } = require('../util/responseHandling');
const { getUserByEmail } = require('../services/userService');

require('dotenv').config();

const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(codes.CODE_401).json({ message: messages.TOKEN_NOT_FOUND });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { email, password } = decoded;
    req.email = email;
    req.password = password;
    req.id = await getUserByEmail(email);
    next();
  } catch (err) {
    return res.status(codes.CODE_401).json({ message: messages.INVALID_TOKEN });
  }
};

module.exports = { tokenValidator };