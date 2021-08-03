const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Category } = require('../models');

const httpStatusCode400 = 400;
const httpStatusCode401 = 401;

const userSchema = ({ title, content }) => Joi.object({
  title: Joi.string().required().error(new Error('"title" is required')),
  content: Joi.string().required().error(new Error('"content" is required')),
}).validate({ title, content });

const validateCategory = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    res.status(httpStatusCode400).json({ message: '"categoryIds" is required' }); return;
  }

  const categories = await Category.findAll();
  const Categories = categories.map((c) => c.id);
  for (let i = 0; i < categoryIds; i += 1) {
    if (!Categories.includes(categoryIds[i])) {
      return res.status(httpStatusCode400).json({ message: '"categoryIds" not found' });
    }
  }

  next();
};

const validateUser = (req, res, next) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;
  const { title, content } = req.body;

  if (!token) { res.status(httpStatusCode401).json({ message: 'Token not found' }); return; }

  try {
    const decoded = jwt.verify(token, JwtSecret);
    if (!decoded) {
      return res.status(httpStatusCode401).json({ message: 'Expired or invalid token' });
    }
    req.user = decoded;
  } catch (error) {
    return res.status(httpStatusCode401).json({ message: 'Expired or invalid token' });
  }

  const { error } = userSchema({ title, content });
  if (error) return res.status(httpStatusCode400).json({ message: error.message });

  req.user = jwt.verify(token, JwtSecret);

  next();
};

module.exports = { validateCategory, validateUser };
