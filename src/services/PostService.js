const { BlogPost, User, Category } = require('../models');

const createPost = async (userId, title, content) => {
  const post = await BlogPost.create({ userId, title, content })
    .then((newPost) => newPost.dataValues)
    .catch((error) => error);

  return post;
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
        attributes: { excludes: ['password'] },
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

  module.exports = { 
  createPost,
  getPostsAll,
  getPostsById,
};