const { BlogPosts, Category, User } = require('../models');

const isBlogPostValid = (title, content, categoryIds) => {
  if (!title) return '"title" is required';
  if (!content) return '"content" is required';
  if (!categoryIds) return '"categoryIds" is required';
};

const getCategories = async (categoryIds) => {
  const findAllCat = await Category.findAll();
  const categoryID = findAllCat.map((category) => category.id);
  const categories = categoryIds.every((validId) => categoryID.includes(validId));

  return categories;
};

const createBlogPosts = async (title, content, categoryIds, userId) => {
  const invalidBlogPost = isBlogPostValid(title, content, categoryIds);
  if (invalidBlogPost) throw new Error(invalidBlogPost);

  const verifyCat = await getCategories(categoryIds);

  if (!verifyCat) throw new Error('"categoryIds" not found');
  const newBlogPost = await BlogPosts.create({ title, content, userId });

  // const newBlogPost = await BlogPosts.create({ title, content, userId });
  // try {
  //   newBlogPost.addCategories(categoryIds);
  // } catch (err) {
  //   throw new Error('"categoryIds" not found');
  // }

  return newBlogPost;
};

const getAllPosts = async () => {
  const userPosts = await BlogPosts.findAll({ include: [
    { model: User, as: 'user', attributes: { excludes: ['password'] } },
    { model: Category, as: 'categories' },
  ] });
  return userPosts;
};

module.exports = {
  createBlogPosts,
  getAllPosts,
};
