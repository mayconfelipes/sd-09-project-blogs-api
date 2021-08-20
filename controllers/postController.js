const { BlogPosts, User, Categories } = require('../models');

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

const getAll = async (req, res) => {
  try {
    const posts = await BlogPosts.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Categories, as: 'categories' },
      ],
    });
    return res.status(200).json(posts);
  } catch (e) {
    return res.status(500).json({});
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPosts.findOne({ 
      where: { id },
      include: [
        { model: User, as: 'user' },
        { model: Categories, as: 'categories' },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (e) {
    return res.status(500).json({});
  }
};

const update = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user;
  const { id } = req.params;
  if (categoryIds) { return res.status(400).json({ message: 'Categories cannot be edited' }); }
  try {
    const post = await BlogPosts.findOne({ where: { id },
      include: [{ model: User, as: 'user' }, { model: Categories, as: 'categories' }],
    });
    if (!post) { return res.status(404).json({ message: 'Post does not exist' }); }
    const authorId = post.dataValues.userId;
    const myUser = Number(userId);
    if (myUser !== authorId) return res.status(401).json({ message: 'Unauthorized user' });
    await BlogPosts.update({ title, content }, { where: { id } });
    const updatePost = await BlogPosts.findOne({ where: { id },
      include: [{ model: User, as: 'user' }, { model: Categories, as: 'categories' }],
    });
    return res.status(200).json(updatePost);
  } catch (e) { return res.status(500).json({}); }
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
};