const categoryModels = require('../models/categoryModels');
const generateError = require('../auxiliarFunctions/generateError');

const postCategory = async (name) => {
  const result = await categoryModels.postCategory(name);

  if (!result) throw generateError('conflict', 'categoria já existente');

  return result;
};

module.exports = {
  postCategory,
};
