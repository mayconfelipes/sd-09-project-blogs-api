const postServices = require('../services/postServices');

const created = 201;
const okay = 200;

const createNewPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const newPost = { title, content, categoryIds };
    const email = req.user;
    const postCreated = await postServices.createNewPost(newPost, email);
    return res.status(created).json(postCreated);
  } catch (error) {
    return next(error);
  }
};

const getAllPosts = async (_req, res, next) => {
  try {
    const allPosts = await postServices.getAllPosts();
    return res.status(okay).json(allPosts);
  } catch (error) {
    return next(error);
  }
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const postById = await postServices.getPostById(id);
    return res.status(okay).json(postById);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
};
