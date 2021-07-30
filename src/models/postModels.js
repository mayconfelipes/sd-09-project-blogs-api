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

module.exports = {
  postNewPost,
  getAllPosts,
  getPostByPostId,
};