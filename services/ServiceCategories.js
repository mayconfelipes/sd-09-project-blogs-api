const RepositoryCategories = require('../repository/RepositoryCategories');

const create = async ({ name }) => {
  const newCategory = await RepositoryCategories.create({ name });

  return newCategory;
};

const getAll = async () => {
  const getAllCategories = await RepositoryCategories.getAll();

  return getAllCategories;
};

module.exports = {
  create,
  getAll,
};