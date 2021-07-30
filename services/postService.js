const status = require('./statusCode');
const { BlogPosts, Categories, PostsCategories } = require('../models');

function objectError(code, message) {
  return { status: status[code], message };
}

async function verifyAllPostId(arrayOfIdCategories) {
  // Promise.all() and map() with async/await found at https://www.techiediaries.com/promise-all-map-async-await-example/
  const allCategoriesFound = await Promise.all(arrayOfIdCategories.map(async (id) => {
    const categories = await Categories.findAll({ where: { id } });
    if (!categories[0]) return 'error';
    return 'found';
  }));
  const resultOfSearch = allCategoriesFound.find((category) => category === 'error');
  if (resultOfSearch === 'error') return true;
  return false;
}

async function postObjectValidator(title, content, categoryIds) {
  if (!title) return objectError('badRequest', '"title" is required');
  if (!content) return objectError('badRequest', '"content" is required');
  if (!categoryIds) return objectError('badRequest', '"categoryIds" is required');
  const categoriesIdsIsValid = await verifyAllPostId(categoryIds);
  if (categoriesIdsIsValid) return objectError('badRequest', '"categoryIds" not found');
  return {};
}

async function postObject(title, content, arrayOfIdCategories, userId) {
  // post the object BlogPosts
  const blogPostsCreated = await BlogPosts.create({ title, content, userId });
  delete blogPostsCreated.dataValues.createdAt;
  delete blogPostsCreated.dataValues.updatedAt;

  // Promise.all() and map() with async/await found at https://www.techiediaries.com/promise-all-map-async-await-example/
  // post the object PostsCategories
  await Promise.all(arrayOfIdCategories.map(async (categoryId) => {
    const categories = await PostsCategories
      .create({ postId: blogPostsCreated.dataValues.id, categoryId });
    return categories.dataValues;
  }));
  return blogPostsCreated;
}

module.exports = {
  postObjectValidator,
  postObject,
};
