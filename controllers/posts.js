const services = require('../services');

const create = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const { id } = req.user;

  const { status, post, message } = await services.posts.create(id, title, categoryIds, content);

  if (status !== 201) res.status(status).json({ message });
  res.status(status).json(post);
};

const getAll = async (req, res) => {
  const { status, posts, message } = await services.posts.getAll();

  if (status !== 200) res.status(status).json({ message });
  res.status(status).json(posts);
};

module.exports = {
  create,
  getAll,
};