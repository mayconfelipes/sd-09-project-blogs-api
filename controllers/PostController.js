const rescue = require('express-rescue');
const PostService = require('../services/PostService');

const createPost = rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  console.log(userId);
  const newPost = await PostService.createPost(title, content, categoryIds, userId);

  return res.status(201).json(newPost);
});

module.exports = {
  createPost,
};