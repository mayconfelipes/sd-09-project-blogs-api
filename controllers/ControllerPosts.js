const ServicePosts = require('../services/ServicePosts');

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const newCategory = await ServicePosts.create({ title, content, categoryIds }, userId);

    return res.status(CREATED).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllBlogPost = await ServicePosts.getAll();

    return res.status(SUCCESS).json(getAllBlogPost);
  } catch (error) {
    return next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await ServicePosts.getPostById(id);

    return res.status(SUCCESS).json(post);
  } catch (error) {
    return next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;

    const upatedPost = await ServicePosts
      .updatePost({ title, content }, id, userId);

    return res.status(SUCCESS).json(upatedPost);
  } catch (error) {
    return next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    await ServicePosts.deletePost(id, userId);

    return res.status(NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

const getPostsWithSearchTerm = async (req, res, next) => {
  try {
    const searchTerm = req.query.q;

    const posts = await ServicePosts.getPostsWithSearchTerm(searchTerm);

    return res.status(SUCCESS).json(posts);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getPostById,
  updatePost,
  deletePost,
  getPostsWithSearchTerm,
};