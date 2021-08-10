const rescue = require('express-rescue');
const { createPostServ } = require('../services/blogPostService');

const createBlogPost = rescue(async (req, res) => {
  const userId = req.user;
  const result = await createPostServ(req.body, userId);
  // if (result.status) return next(result);
  return res.status(201).json(result);
});

module.exports = {
  createBlogPost,
};