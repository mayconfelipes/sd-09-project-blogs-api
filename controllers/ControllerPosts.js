const ServicePosts = require('../services/ServicePosts');

const SUCCESS = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const newCategory = await ServicePosts.create({ title, content, categoryIds }, userId);

    return res.status(CREATED).json(newCategory);
  } catch (error) {
    next(error);
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

module.exports = {
  create,
  getAll,
};