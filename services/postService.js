const status = require('./statusCode');
const { Users, BlogPosts, Categories, PostsCategories } = require('../models');

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

function postPutObjectValidator(title, content, categoryIds) {
  if (!title) return objectError('badRequest', '"title" is required');
  if (!content) return objectError('badRequest', '"content" is required');
  if (categoryIds) return objectError('badRequest', 'Categories cannot be edited');
  return {};
}

async function userValidator(id, userLogedId) {
  const post = await BlogPosts.findOne({ where: { id } });
  if (!post) return objectError('notFound', 'Post does not exist');
  if (post.dataValues.userId !== userLogedId) {
    return objectError('unauthorized', 'Unauthorized user');
  }
  return {}; 
}

async function postPutUpdate(id, title, content) {
  await BlogPosts.update({ title, content }, { where: { id } });
  const post = await BlogPosts.findOne(
    { attributes: ['title', 'content', 'userId'],
    where: { id },
    include: [
      { model: Categories, as: 'categories' },
    ] },
    );
  return post; 
}

async function postObject(title, content, arrayOfIdCategories, userId) {
  // post the object BlogPosts
  const blogPostsCreated = await BlogPosts.create({ title, content, userId });
  delete blogPostsCreated.dataValues.published;
  delete blogPostsCreated.dataValues.updated;

  // Promise.all() and map() with async/await found at https://www.techiediaries.com/promise-all-map-async-await-example/
  // post the object PostsCategories
  await Promise.all(arrayOfIdCategories.map(async (categoryId) => {
    const categories = await PostsCategories
      .create({ postId: blogPostsCreated.dataValues.id, categoryId });
    return categories.dataValues;
  }));
  return blogPostsCreated;
}

async function getAllBlogPosts() {
  const posts = await BlogPosts.findAll({
    include: [
      { attributes: ['id', 'displayName', 'email', 'image'], model: Users, as: 'user' },
      { model: Categories, as: 'categories' },
    ],
  });

  return posts;
}

async function getBlogPostById(id) {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      { attributes: ['id', 'displayName', 'email', 'image'], model: Users, as: 'user' },
      { model: Categories, as: 'categories' },
    ],
  });
  if (!post) return objectError('notFound', 'Post does not exist');
  return post;
}

async function deletePost(id) {
  const postDeleted = await BlogPosts.destroy({ where: { id } });
  return postDeleted;
}

module.exports = {
  postObjectValidator,
  postPutObjectValidator,
  userValidator,
  postPutUpdate,
  postObject,
  getAllBlogPosts,
  getBlogPostById,
  deletePost,
};
