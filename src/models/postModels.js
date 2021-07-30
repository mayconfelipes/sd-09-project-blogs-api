const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../sequelize/models');

const postNewPost = async ({ userId, title, content }) => {
  const result = await BlogPost.create({ userId, title, content });

  return result;
};

const getAllPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ], // tirando os dados da associação https://github.com/sequelize/sequelize/issues/3664#issuecomment-99749876
  });

  return result;
};

const getPostByPostId = async (id) => {
  const result = await BlogPost.findOne({ where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const updatePost = async ({ id, title, content }) => {
  const result = await BlogPost.update({ title, content }, { where: { id } });

  return result;
};

const deletePost = async (id) => {
  const result = await BlogPost.destroy({ where: { id } });

  return result;
};

const searchPost = async (term) => {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${term}%` } },
        { content: { [Op.like]: `%${term}%` } },
      ],
    },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

module.exports = {
  postNewPost,
  getAllPosts,
  getPostByPostId,
  updatePost,
  deletePost,
  searchPost,
};