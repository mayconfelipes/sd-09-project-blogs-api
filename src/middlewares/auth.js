const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { getBlogPostById } = require('../services/blogPostsServices');
const { getUserByEmail } = require('../services/usersServices');

const secret = 'ran0405069miifjurdo43423zeuuADPlus';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginSchema = Joi.object({
  email: Joi.string().empty().email().required(),
  password: Joi.string().empty().required(),
});

const validateLoginData = async (loginData) => {
  const { error } = loginSchema.validate(loginData);
  if (error) return { response: 400, message: error.details[0].message };
  const user = await getUserByEmail(loginData.email);
  if (!user || user.password !== loginData.password) {
    return { response: 400, message: 'Invalid fields' };
  }
  return null;
};

const authorizeLogin = async (req, res, next) => {
  const loginData = req.body;
  const error = await validateLoginData(loginData);
  if (error) {
    return res.status(error.response).json({ message: error.message });
  }
  next();
};

const generateToken = (userData) => {
  const token = jwt.sign({ data: userData }, secret, jwtConfig);
  return token;
};

const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error({ message: 'Token Not Found' });
    }
    const tokenDecoded = jwt.verify(token, secret);
    const { email } = tokenDecoded.data;
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error({ message: 'Invalid Token' });
    }
    return user.dataValues;
  } catch (error) {
    throw new Error(error);
  }
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    if (req.url === '/admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const validateUSerPrivilege = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const blogpost = await getBlogPostById(id);
    if (userId !== blogpost.userId) throw new Error('Unauthorized user');
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  authorizeLogin,
  generateToken,
  validateToken,
  validateUSerPrivilege,
  verifyToken,
};
