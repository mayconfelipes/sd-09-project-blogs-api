const rescue = require('express-rescue');
const services = require('../services/blogPostsService');
const blogPostsValidate = require('../middlewares/blogPostsValidate');
const validateToken = require('../middlewares/validateToken');

const createPosts = [
  blogPostsValidate,
  validateToken,
  rescue(async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const post = await services.createBlogPosts({ title, content, categoryIds });
    if (!categoryIds || categoryIds === null) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    return res.status(201).json(post);
  }),
];

module.exports = {
  createPosts,
};