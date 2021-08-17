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

    res.status(statusHTTP.CREATED).json(categories);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'listar categorias' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  list,
};
