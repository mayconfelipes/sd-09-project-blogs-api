const models = require('../models');

const createPost = async (req, res) => {
  const { userId } = req;
  const { title, content } = req.body;
  const post = await models.BlogPosts.create({ title, content, userId });
  console.log(post);
  res.status(201).json(post);
};

// de um npx sequelize db:migrate para a tabela postscategories aparecer no banco

const getAll = async (_req, res) => {
  const posts = await models.BlogPosts.findAll(
    { include: [
      { model: models.Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Categories, as: 'categories', through: { attributes: [] } },
    ] },
  );
  res.status(200).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await models.BlogPosts.findOne(
    { where: { id },
    include: [
      { model: models.Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: models.Categories, as: 'categories', through: { attributes: [] } },
    ] },
    );
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(post);
};

module.exports = {
  createPost,
  getAll,
  getById,
};