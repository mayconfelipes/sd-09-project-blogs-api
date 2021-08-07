const { BlogPost, Category, User } = require('../models');
const { validateCategory } = require('../middlewares/validateFormPost');

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
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return allPosts;
};

module.exports = {
  createPost,
  getAllPosts,
};