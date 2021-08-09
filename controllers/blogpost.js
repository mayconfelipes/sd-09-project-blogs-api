const rescue = require('express-rescue');
const {
  validateIfCategoryExists,
  validateBlogPostData,
  validateToken,
} = require('../middlewares/validations');
const blogPostServices = require('../services/blogpost');

const newBlogPost = [
  validateToken,
  validateBlogPostData,
  validateIfCategoryExists,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = await req.user;
    const newPost = await blogPostServices.createPost({
      title,
      content,
      userId,
    });
    return res.status(201).json(newPost);
  }),
];

const getBlogPosts = [
  validateToken,
  async (_req, res) => {
    const posts = await blogPostServices.findAllBlogPosts();
    return res.status(200).json(posts);
  },
];

module.exports = { newBlogPost, getBlogPosts };
