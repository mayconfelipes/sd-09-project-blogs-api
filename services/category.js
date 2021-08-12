const { Category } = require('../models');

const validateName = async (request, response, next) => {
  const { name } = request.body;
  // console.log(`Imprimindo valor de name em category/services ${name}`);

  if (name === '' || !name) {
    return response.status(400).json({ message: '"name" is required' });
  }
  next();
};

/* Traz todos as categorias do banco */
const listCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  validateName,
  listCategories,
};