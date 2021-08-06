const { BlogPost } = require('../models');
const { PostsCategory, User, Category } = require('../models');
const CustomError = require('../utils/CustomError');
const CategoryService = require('./Category');

const associateCategory = (categoryIds, postId) => {
  categoryIds.forEach((categoryId) => {
    PostsCategory.create({ postId, categoryId });
  });
};

const checkCategories = async (categoryIds) => {
  const categories = await CategoryService.getAll();
  categoryIds.forEach((id) => {
    if (!(categories.some(({ dataValues }) => dataValues.id === id))) {
      throw new CustomError('invalidData', '"categoryIds" not found');
    }
  });
};

const create = async ({ title, content, categoryIds }, userId) => {
  await checkCategories(categoryIds);
  const post = await BlogPost.create({ title, content, userId });
  associateCategory(categoryIds, post.id);
  return {
    id: post.id,
    userId: post.userId,
    title: post.title,
    content: post.content,
  };
};

const getAll = () => BlogPost.findAll({ 
  include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) {
    throw new CustomError('notFound', 'Post does not exist');
  }
  return post;
};

const updateById = async (id, userId, postData) => {
  const post = await getById(id);
  if (post.userId !== userId) {
    throw new CustomError('invalidToken', 'Unauthorized user');
  }
  await BlogPost.update({ ...postData }, { where: { id } });
  return getById(id);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
};
