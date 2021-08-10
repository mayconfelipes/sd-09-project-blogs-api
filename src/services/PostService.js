const { BlogPost, User, Category } = require('../models');

const createPost = async (userId, title, content) => {
  const post = await BlogPost.create({ userId, title, content })
    .then((newPost) => newPost.dataValues)
    .catch((error) => error);

  return post;
};

const getPostsAll = async () => {
  const post = await BlogPost.findAll({
    include: [{
        model: User,
        as: 'users',
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
  module.exports = { 
  createPost,
  getPostsAll,
};