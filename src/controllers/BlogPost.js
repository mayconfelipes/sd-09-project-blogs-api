const rescue = require('express-rescue');
const BlogPost = require('../services/BlogPost');

const create = rescue(async (req, res) => {
  const { userId } = req;
  const { title, content, categoryIds } = req.body;
  const post = await BlogPost.create(title, content, categoryIds, userId);

  return res.status(201).json(post);
});

module.exports = {
  create,
};
