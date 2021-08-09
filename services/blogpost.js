const { BlogPost, Category, User } = require('../models');

const createPost = async (postData) => {
  const newPost = await BlogPost.create(postData);
  const { id, title, content, userId } = newPost.dataValues;
  return { id, title, content, userId };
};

const findAllBlogPosts = async () =>
  BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

module.exports = { createPost, findAllBlogPosts };
