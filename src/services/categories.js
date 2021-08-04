const { Category } = require('../../models');

const createNew = async (cat) => {
  const { name } = cat;
  await Category.create({ name });
  return Category.findOne({ where: { name } });
};

const getAll = async () => Category.findAll();

module.exports = {
  createNew,
  getAll,
};