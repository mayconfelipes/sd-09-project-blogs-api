const rescue = require('express-rescue');
const Post = require('../services/PostsService');

const create = rescue(async (req, res) => {
  const { userId } = req;
  const { title, content, categoryIds } = req.body;
  const post = await Post.create({ userId, title, content, categoryIds });

  return res.status(201).json(post);
});

module.exports = {
  create,
};