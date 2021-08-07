const rescue = require('express-rescue');
const services = require('../services/blogPostsService');
const blogPostsValidate = require('../middlewares/blogPostsValidate');
const validateToken = require('../middlewares/validateToken');

const createPosts = [
  blogPostsValidate,
  validateToken,
  rescue(async (req, res) => {
    const { id: userId } = req.user;
    const { title, content, categoryIds } = req.body;
    const post = await services.createBlogPosts({ title, content, categoryIds, userId });
    if (!post) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    return res.status(201).json(post);
  }),
];

const getAllBlogPosts = [
  validateToken,
  rescue(async (_req, res) => {
    const getByPosts = await services.getAllPosts();
    return res.status(200).json(getByPosts);
  }),
];

module.exports = {
  createPosts,
  getAllBlogPosts,
};