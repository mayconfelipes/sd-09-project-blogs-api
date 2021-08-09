const { BlogPost, Category, User } = require('../models');

const createPost = async (postData) => {
  const newPost = await BlogPost.create(postData);
  const { id, title, content, userId } = newPost.dataValues;
  const data = { id, title, content, userId };
  return data;
};

const findAllBlogPosts = async () =>
  BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

module.exports = { createPost, findAllBlogPosts };
