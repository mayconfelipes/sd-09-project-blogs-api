const status = require('../status/status');
const { BlogPost } = require('../models');

const newPost = async (body, user) => {
  const { id } = user;
  const post = await BlogPost.create({
    userId: id,
    ...body,
    published: new Date(),
    updated: new Date(),
  });
  return post;
};

const validateBody = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) {
    return res.status(status.BAD_REQUEST).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(status.BAD_REQUEST).json({ message: '"content" is required' });
  }
  if (!categoryIds) {
    return res.status(status.BAD_REQUEST).json({ message: '"categoryIds" is required' });
  }
  if (!categoryIds.every((cat) => cat === 1 || cat === 2)) {
    return res.status(status.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

const catNotFound = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds.forEach((cat) => cat === 1 || cat === 2)) {
    return res.status(status.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }
  next();
};

module.exports = {
  validateBody,
  catNotFound,
  newPost,
};