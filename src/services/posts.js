const { User, BlogPost, Category } = require('../../models');

const createNew = async (title, content, userId) => {
  const newPost = await BlogPost.create({ title, content, userId });
  return newPost;
};

const getAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
      // { model: Categories, as: 'categoryId', through: { attributes: [] } },
  });
  // console.log(allPosts);
  // return BlogPosts.findAll();
  return allPosts;
};

module.exports = {
  createNew,
  getAll,
};