const postsServices = require('../services/postsServices');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  const id = await postsServices.create({ title, content, categoryIds, userId });
  // console.log;
  return res
    .status(201)
    .json({ id, title, content, userId });
};

module.exports = {
  create,
};