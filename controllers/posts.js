const services = require('../services');

const create = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const { id } = req.user;

  const { status, post, message } = await services.posts.create(id, title, categoryIds, content);

  if (status !== 201) res.status(status).json({ message });
  res.status(status).json(post);
};

module.exports = {
  create,
};