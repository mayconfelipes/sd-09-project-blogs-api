const rescue = require('express-rescue');
const Post = require('../services/PostsService');

const create = rescue(async (req, res) => {
  const { userId } = req;
  const { title, content, categoryIds } = req.body;
  const post = await Post.create({ userId, title, content, categoryIds });

  return res.status(201).json(post);
});

const getAll = async (_req, res) => {
  const posts = await Post.getAll();

  return res.status(200).json(posts);
};

module.exports = {
  create,
  getAll,
};