const { BlogPosts } = require('../models');

const add = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user;
  try {
    const post = await BlogPosts.create({ userId, title, content });

    return res.status(201).json(post);
  } catch (e) {
    return res.status(500).json({ message: 'Erro 123' });
  }
};

module.exports = {
  add,
};