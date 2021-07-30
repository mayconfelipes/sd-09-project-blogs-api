const postModels = require('../models/postModels');
const categoryModels = require('../models/categoryModels');
const generateError = require('../auxiliarFunctions/generateError');

const checkPostCategories = async (categoryArray) => Promise
  .all(categoryArray.map((id) => categoryModels.getCategoryById(id)));

const postNewPost = async ({ userId, title, content, categoryIds }) => {
  const categoryCheck = await checkPostCategories(categoryIds);

  if (categoryCheck.includes(null)) throw generateError('badRequest', '"categoryIds" not found');

  const result = await postModels.postNewPost({ userId, title, content, categoryIds });

  return result;
};

module.exports = {
  postNewPost,
};
