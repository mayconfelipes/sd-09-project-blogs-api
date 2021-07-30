const {
  registerPostService,
  getAllPostsService,
  getPostByIdService,
} = require('../services/postService');

const registerPostController = async (req, res, next) => {
  const { body, payload } = req;
  const result = await registerPostService(body, payload);
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(200).json(response);
};

const getAllPostsController = async (_req, res, next) => {
  const result = await getAllPostsService();
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(200).json(response);
};

const getPostByIdController = async (req, res, next) => {
  const { params: { id } } = req;
  const result = await getPostByIdService(id);
  if (!result.response) {
    return next(result.error);
  }
  const { response } = result;
  return res.status(200).json(response);
};

module.exports = {
  registerPostController,
  getAllPostsController,
  getPostByIdController,
};
