const postService = require('../services/postService');

const create = async (req, res, next) => {
  try {
    const newPost = await postService.create(req.body, req.user);
    return res.status(201).json(newPost);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const posts = await postService.getAll();
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  getAll,
};
