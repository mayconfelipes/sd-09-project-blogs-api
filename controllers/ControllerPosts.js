const ServicePosts = require('../services/ServicePosts');

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

module.exports = {
  create,
};