const blogPosts = require('../services/blogPostsService');
const { BAD_REQUEST, UNAUTHORIZED } = require('../utils/httpStatus');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    const result = await blogPosts.create({ title, content, categoryIds }, authorization);
    return res.status(201).json(result);
  } catch (error) {
      if (error.type === BAD_REQUEST) error.status = 400;
      if (error.type === UNAUTHORIZED) error.status = 401;
      next(error);
  }
};

module.exports = {
  create,
};
