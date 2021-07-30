const { Category } = require('../models');
const { CategorySchema, joiError } = require('../schemas/validateError');

const createCategory = async (body) => {
  const { error } = CategorySchema.validate(body);
  if (error) throw joiError(400, error);
  
  const { name } = body;
  const newCategory = await Category.create({ name });
  
  return {
    id: newCategory.null,
    name: newCategory.dataValues.name,
  };
};

module.exports = {
  createCategory,
};
