const status = require('./statusCode');
const { Categories } = require('../models');

function objectError(code, message) {
  return { status: status[code], message };
}

async function categorieObjectValidator(name) {
  if (!name) return objectError('badRequest', '"name" is required');
  const categorieExists = await Categories.findOne({ where: { name } });
  if (categorieExists) return objectError('conflict', `categorie "${name}" is already registered!`);
  const categorieCreated = await Categories.create({ name });
  delete categorieCreated.dataValues.id;
  return categorieCreated;
}

async function categoryFindAll() {
  const allCategories = await Categories.findAll();
  return allCategories;
}

module.exports = {
  categorieObjectValidator,
  categoryFindAll,
};
