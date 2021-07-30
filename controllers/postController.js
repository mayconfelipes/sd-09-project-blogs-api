const postService = require('../services/postService');

const createPost = async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;

  const newPost = await postService.createPost(title, content, categoryIds);

  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
};
