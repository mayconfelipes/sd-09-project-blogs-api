const { Categories } = require('../../models');

const createNew = async (cat) => {
  const { name } = cat;
  await Categories.create({ name });
  return Categories.findOne({ where: { name } });
};

const getAll = async () => {
  return Categories.findAll();
};

module.exports = {
  createNew,
  getAll,
};