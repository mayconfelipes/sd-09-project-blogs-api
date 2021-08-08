const Models = require('../models/category');

const save = async (category) => {
  if (!category.name) {
    return { error: true, code: 'STATUS_BAD_REQUEST', message: 'nonexistentName' };
  }
  const newCategory = await Models.saveCategory(category);

  return newCategory;
};

const all = async () => {
  const categories = await Models.getAll();

  return categories;
};

module.exports = {
  save,
  all,
};
