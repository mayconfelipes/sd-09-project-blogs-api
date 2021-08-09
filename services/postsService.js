const { BlogPost, Category, User } = require('../models');

const categoriesCheck = async (categoryIds) => {
  let categoryIdsList = await Category.findAll({ attributes: ['id'] });
  categoryIdsList = categoryIdsList.map((category) => category.dataValues.id);
  return categoryIds.every((category) => categoryIdsList.includes(category));
};

const addCategoriesToPost = async (postId, categoryIds) => {
  const createdBlogPost = await BlogPost.findByPk(postId);
  const categoriesToAdd = await Category.findAll({ where: { id: categoryIds } });
  await createdBlogPost.addCategories(categoriesToAdd);
};

const createPost = async (post, userId) => {
  const { title, content, categoryIds } = post;
  const categoryCheck = await categoriesCheck(categoryIds);
  if (!categoryCheck) {
    const err = new Error('"categoryIds" not found');
    err.status = 400;
    throw err;
  }
  const { dataValues: newPost } = await BlogPost.create({ title, content, userId });
  delete newPost.createdAt;
  delete newPost.updatedAt;
  await addCategoriesToPost(newPost.id, categoryIds);
  return newPost;
};

const postObjectTransform = (post) => {
  const postObject = post.dataValues;
  postObject.published = postObject.createdAt;
  postObject.updated = postObject.updatedAt;
  postObject.user = postObject.user.dataValues;
  postObject.categories = postObject.categories.map((category) => category.dataValues);
  delete postObject.user.password;
  delete postObject.createdAt;
  delete postObject.updatedAt;
  return postObject;
};

const getAllPosts = async () => {
  let postsList = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  postsList = postsList.map((post) => postObjectTransform(post));
  return postsList;
};

const getPostById = async (id) => {
  const foundPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!foundPost) {
    const err = new Error('Post does not exist');
    err.status = 404;
    throw err;
  }
  const postById = postObjectTransform(foundPost);
  return postById;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
