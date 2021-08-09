const service = require('../services/post');

const createPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const response = await service.createPost({ title, content, categoryIds, authorization });
  if (response.error) return next(response.error);
  return res.status(201).json(response);
};

const getAllPost = async (req, res, next) => {
  const { authorization } = req.headers;
  const response = await service.getAllPost({ authorization });
  if (response.error) return next(response.error);
  return res.status(200).json(response);
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const response = await service.getPostById({ authorization, id });
  if (response.error) return next(response.error);
  return res.status(200).json(response);
};

module.exports = {
  createPost,
  getAllPost,
  getPostById };