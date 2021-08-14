const { Op } = require('sequelize');
const { BlogPost, User, Category, PostsCategory } = require('../models');

const createPost = async (userId, title, content) => {
  const post = await BlogPost.create({ userId, title, content })
    .then((newPost) => newPost.dataValues)
    .catch((error) => error);

  return post;
};

const CreatePostCategory = async (categoryIds, postId) => {
  categoryIds.forEach((categoryId) => {
     PostsCategory.create({ categoryId, postId });
  });
};

const getPostsAll = async () => {
  const post = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { excludes: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return post;
};

const getPostsById = async (id) => {
  const postById = await BlogPost.findByPk((id), {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return postById;
};

const getPostsByIdForUpdate = async (id) => {
  const postById = await BlogPost.findByPk((id), {
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return postById;
};

const updatePost = async (title, content, id) => {
  const post = await BlogPost.update({ title, content }, { where: { id } })
    .then(() => getPostsByIdForUpdate(id));

  return post;
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const SearchPost = async (search) => {
  const posts = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } },
        ],
      },
      include: [{
          model: User, as: 'user', attributes: { exclude: ['password'] },
        }, {
          model: Category, as: 'categories', through: { attributes: [] },
        }],
    });
  return posts;
};

module.exports = { 
  createPost,
  getPostsAll,
  getPostsById,
  CreatePostCategory,
  updatePost,
  deletePost,
  SearchPost,
};