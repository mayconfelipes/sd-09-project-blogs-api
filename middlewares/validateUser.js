const Joi = require('joi');
const jwt = require('jsonwebtoken');

const secret = 'meuSegredoSuperSegreto';

const jwtResponse = (displayName, email) => {
  const jwtParams = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const payload = {
    displayName,
    email,
  };
  const token = jwt.sign(payload, secret, jwtParams);
  return token;
};

const validateError = async (status, message) => ({
  status,
  message,
});

const validateUser = async (req, _res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  }).validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

const validateLogin = async (req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

const verifyToken = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return next({
      status: 401,
      message: 'Token not found',
    });
  }
  try {
    req.decodedToken = jwt.verify(token, secret);
    next();
  } catch (err) {
    return next({
      status: 401,
      message: 'Expired or invalid token',
    });
  }
};

module.exports = {
  validateError,
  validateUser,
  validateLogin,
  jwtResponse,
  verifyToken,
};