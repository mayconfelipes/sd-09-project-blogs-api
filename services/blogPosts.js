const { BlogPost, User, Category } = require('../models');
const categoryServices = require('./categories');
const postCategoryServices = require('./postsCategories');

const verifyPostCategories = async (categoryIds) => (
  Promise.all(categoryIds.map((categoryId) => categoryServices.getById(categoryId)))
  // Referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
);

const create = async ({ userId, title, content, categoryIds }) => {
  const categories = await verifyPostCategories(categoryIds);
  const error = categories.find((category) => category.error);

  if (error) return error;
  
  const createdPost = await BlogPost.create({ userId, title, content });
  const { updated, published, ...post } = createdPost.dataValues;

  categoryIds.forEach(async (categoryId) => {
    await postCategoryServices.create({
      postId: post.id,
      categoryId,
    });
  });
  
  return post;
};

const getAll = async () => {
  const blogPostsList = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return blogPostsList;
};

const getById = async (id) => {
  const foundBlogPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!foundBlogPost) {
    return { error: { statusCode: 404, message: 'Post does not exist' } };
  }

  return foundBlogPost;
};

const update = async (title, content, id, userId) => {
  if (Number(id) !== userId) {
    return { error: { statusCode: 401, message: 'Unauthorized user' } };
  }

  await BlogPost.update({ title, content }, { where: { id } });
  const updatedBlogPost = await BlogPost.findOne({
    where: { id },
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });

  return updatedBlogPost;
};

const remove = async (id, userId) => {
  const removedBlogPost = await BlogPost.findOne({ where: { id } });
  if (!removedBlogPost) {
    return { error: { statusCode: 404, message: 'Post does not exist' } };
  }

  if (Number(id) !== userId) {
    return { error: { statusCode: 401, message: 'Unauthorized user' } };
  }

  await BlogPost.destroy({ where: { id } });
}; 

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
