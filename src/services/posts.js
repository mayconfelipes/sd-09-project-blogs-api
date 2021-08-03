const { Users, BlogPosts, Categories } = require('../../models');

const createNew = async (title, content, userId) => {
  const newPost = await BlogPosts.create({ title, content, userId });
  return newPost;
};

const getAll = async () => {
  // const allPosts = await BlogPosts.findAll({}, {
  //   include: [
  //     { model: Users, as: 'user', through: { attributes: ['userId'] } },
  //     { model: Categories, as: 'categories', through: { attributes: [] } },
  //   ],
  // });
  return BlogPosts.findAll();
  // return allPosts;
};

module.exports = {
  createNew,
  getAll,
};