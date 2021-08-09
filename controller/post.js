const service = require('../services/post');

const createPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const response = await service.createPost({ title, content, categoryIds, authorization });
  if (response.error) return next(response.error);
  return res.status(201).json(response);
};

module.exports = {
  createPost };