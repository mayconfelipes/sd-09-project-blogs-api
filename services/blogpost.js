const { Category } = require('../models');
const { User } = require('../models');
const { BlogPost } = require('../models');

const validateTitle = async (req, res, next) => {
  const { title } = req.body;

  if (title === '' || !title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  next();
};

const validateContent = async (req, res, next) => {
  const { content } = req.body;

  if (content === '' || !content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const validateCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  
  if (!categoryIds || !categoryIds.length) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categoryIds.length !== categories.length) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const validateToEditCategories = (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
  next();
};

const validateUser = async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.user;
  const { id: userId } = await User.findOne({ where: { email } });
  const post = await BlogPost.findOne({ where: { id } });
  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategories,
  validateToEditCategories,
  validateUser,
}; 