const { Categories, BlogPosts, User, PostCategories } = require('../models');

const createErrorMsg = (code, msg) => ({
  code,
  msg,
});

const validateTitleContentAndCategoryField = ({ title, content, categoryIds }) => {
  if (!title) {
    throw createErrorMsg('invalid_arguments', '"title" is required');
  }
  if (!content) {
    throw createErrorMsg('invalid_arguments', '"content" is required');
  }
  if (categoryIds === undefined) {
    throw createErrorMsg('invalid_arguments', '"categoryIds" is required');
  }
};

const verifyCategory = async (categoryIds) => {
  const results = [];
  for (let index = 0; index < categoryIds.length; index += 1) {
    results.push(Categories.findByPk(categoryIds[index]));  
  }
  const categories = await Promise.all(results);
  console.log(categories);
  for (let index = 0; index < categories.length; index += 1) {
    if (categories[index] === null) {
      throw createErrorMsg('invalid_arguments', '"categoryIds" not found');
    }
  }
};

const saveOnDbPostCategory = async (categoryIds, postId) => {
  const results = [];
  for (let index = 0; index < categoryIds.length; index += 1) {
    const categoryId = categoryIds[index]; 
    results.push(PostCategories.create({ postId, categoryId }));  
  }
  await Promise.all(results);
};

const createPost = async (postInfos) => {
  const { title, content } = postInfos;
  validateTitleContentAndCategoryField(postInfos);
  await verifyCategory(postInfos.categoryIds);
  const post = await BlogPosts.create({ title, content });
  const allPostInfos = await BlogPosts.findByPk(post.id);  
  await saveOnDbPostCategory(postInfos.categoryIds, post.id);
  return allPostInfos;
};

const listsPosts = async () => {
  const posts = await BlogPosts.findAll({
    include:
    [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};
module.exports = {
  createPost,
  listsPosts,
};