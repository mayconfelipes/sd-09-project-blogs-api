const { Post, Category, User, PostCategory } = require('../models');

const errorGenerate = (code, message) => ({ error: { code, message } });

const createPost = async (userId, { title, categoryIds, content }) => {
  const categories = categoryIds.map(async (id) => Category.findByPk(id));
  const resultPromiseCategories = await Promise.all(categories); // resolve o array de promise

  if (resultPromiseCategories.includes(null)) {
    return errorGenerate('categoryIdsNotFound', '"categoryIds" not found');
  }

  const post = await Post.create({ userId, title, content });

  delete post.dataValues.published;
  delete post.dataValues.updated;

  const postId = post.dataValues.id;

  categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ categoryId, postId });
  });

  return post;
};

const getAll = async () => {
  const posts = await Post
    .findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ] });
  return posts;
};

const getById = async (id) => {
  const post = await Post.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return errorGenerate('postNotFound', 'Post does not exist');

  return post;
};

const updatePost = async (id, { title, content }, userId) => {
  const lastPost = await Post.findOne({ where: { id } });

  if (lastPost.dataValues.userId !== userId) {
    return errorGenerate('userUnauthorized', 'Unauthorized user');
  }

  const queryUpdated = await Post.update({ title, content }, { where: { id } });

  if (!queryUpdated[0]) {
    return errorGenerate('notUpdated', 'Error updating, try again');
  }

  const postUpdated = await Post.findOne({
    where: { id },
    attributes: { exclude: ['published', 'updated', 'id'] },
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });

  return postUpdated;
};

module.exports = {
  getAll,
  getById,
  createPost,
  updatePost,
};