const postService = require('../services/postService');

const create = async (req, res, next) => {
  try {
    const newPost = await postService.create(req.body, req.user);
    return res.status(201).json(newPost);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
};
