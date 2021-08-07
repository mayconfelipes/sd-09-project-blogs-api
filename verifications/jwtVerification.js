require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../models');

const responseToken = (errorSentence) => {
  if (errorSentence === 'JsonWebTokenError: jwt malformed') {
    return { error: true, status: 401, message: 'Expired or invalid token' };
  }

  if (errorSentence === 'JsonWebTokenError: jwt must be provided') {
    return { error: true, status: 401, message: 'Token not found' };
  }

  return { error: false };
};

const jwtVerification = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log('..........---------CHEGUEI NA TOKEEEEENNNNLINHA 20', token);
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await User.findOne({ where: { email: decode.email } });

    const { password, ...exceptPassword } = foundUser.dataValues;
    req.user = exceptPassword;
    next();
  } catch (err) {
    const errorString = SyntaxError.toString();
    const responseError = responseToken(errorString);
    const { error, status, message } = responseError;
    if (error) return res.status(status).json({ message });
  }
};

module.exports = jwtVerification;
