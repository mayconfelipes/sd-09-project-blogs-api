const postServices = require('../services/postServices');

const createPost = async (req, res) => {
  const post = await postServices.createPost(req.body, req.user.id);
  res.status(201).json(post);
};

module.exports = { createPost };
