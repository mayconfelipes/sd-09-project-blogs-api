const { BlogPost, Category, User } = require('../models');
const {
  validateCategory,
  validateExistPost,
  validatePostUpdate,
} = require('../middlewares/validateFormPost');

const createPost = async (body, user) => {
  const categoryExist = await validateCategory(body);
  if (!categoryExist) throw new Error('"categoryIds" not found');
  const { id } = user;
  const newPost = await BlogPost.create({
    userId: id,
    ...body,
    published: new Date(),
    updated: new Date(),
  });
  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return allPosts;
};

const getPostById = async (id) => {
  const existPost = await validateExistPost(id);
  if (!existPost) throw new Error('Post does not exist');
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return post;
};

const updatePost = async (id, body, userId) => {
  const { title, content } = body;
  validatePostUpdate(body);
  const getPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  if (getPost.userId !== userId) throw new Error('Unauthorized user');
  await BlogPost.update({ title, content }, { where: { id } });
  return { title, content, userId, categories: getPost.categories };
};

const deletePost = async (id, userId) => {
  const getPost = await BlogPost.findOne({ where: { id } });
  if (!getPost) throw new Error('Post does not exist');
  if (getPost.userId !== userId) throw new Error('Unauthorized user');
  await BlogPost.destroy({ where: { id } });
  return {};
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};