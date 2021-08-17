const Category = require('../services/category');

const statusHTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
};

// Rotas
const create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const categories = await Category.create(authorization, req.body);

    return res.status(statusHTTP.CREATED).json(categories);
  } catch (error) {
    return next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const categories = await Category.list(authorization);

    return res.status(statusHTTP.OK).json(categories);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  list,
};
