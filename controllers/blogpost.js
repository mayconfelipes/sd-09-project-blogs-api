const rescue = require('express-rescue');
const {
  validateIfCategoryExists,
  validateBlogPostData,
  validateToken,
} = require('../middlewares/validations');
const { createPost } = require('../services/blogpost');

const newBlogPost = [
  validateToken,
  validateBlogPostData,
  validateIfCategoryExists,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id } = await req.user;
    const newPost = await createPost({ title, content, userId: id });
    return res.status(201).json(newPost);
  }),
];

module.exports = { newBlogPost };
