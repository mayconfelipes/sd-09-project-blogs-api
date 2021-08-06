const { Categorie } = require('./models');

const errorHandling = (status, message) => ({
  status,
  message,
});

const existingCategory = async (categoryIds) => {
  const categories = await Categorie.findAll({ raw: true });
  const CategoryId = categories.map(({ id }) => id);
  return categoryIds.every((category) => CategoryId.includes(category));
};

module.exports = {
  errorHandling,
  existingCategory,
};