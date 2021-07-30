const rescue = require('express-rescue');
const validateToken = require('../middlewares/validateToken');
const validations = require('../middlewares/validations');

const blogPostService = require('../services/blogPostService');

const httpStatus = require('../middlewares/httpStatus');

const createBlogPost = [
  validations.postsValidate,
  validations.isCategoryIdEmpty,
  validateToken,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.user.dataValues;
    const post = await blogPostService.createBlogPost(title, content, userId);
    return res.status(httpStatus.CREATED).json(post);
  }),
];

const getAllBlogPosts = [
  validateToken,
  rescue(async (_req, res) => {
    const allBlogPosts = await blogPostService.getAllBlogPosts();
    return res.status(httpStatus.OK).json(allBlogPosts);
  }),
];

module.exports = {
  createBlogPost,
  getAllBlogPosts,
};