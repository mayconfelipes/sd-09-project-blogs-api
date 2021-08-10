const rescue = require('express-rescue');
const { createPostServ, getAllPostsServ } = require('../services/blogPostService');

const createBlogPost = rescue(async (req, res) => {
  const userId = req.user;
  const result = await createPostServ(req.body, userId);
  // if (result.status) return next(result);
  return res.status(201).json(result);
});

const getAllPosts = rescue(async (_req, res) => {
  const result = await getAllPostsServ();
  return res.status(200).json(result);
});

module.exports = {
  createBlogPost,
  getAllPosts,
};