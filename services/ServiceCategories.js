const RepositoryCategories = require('../repository/RepositoryCategories');

const create = async ({ name }) => {
  const newCategory = await RepositoryCategories.create({ name });

  return newCategory;
};

module.exports = {
  create,
};