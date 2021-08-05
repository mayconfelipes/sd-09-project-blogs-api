const { BlogPost, User, Category } = require('../models');
const status = require('../status/status');

const create = async (req, res) => {
  try {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;
  const post = await BlogPost.create({ title, content, categoryIds, userId });

  res.status(status.CREATED).json(post);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Deu ruim no post' });
  }
};

const findAll = async (req, res) => {
  try {
    const allPosts = await BlogPost.findAll(
      { include: [
        { model: User, as: 'user', attibutes: { exlude: ['password'] } },
        { model: Category, as: 'categories', through: { attibutes: [] } },
      ] },
    );
    res.status(status.OK).json(allPosts);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Deu ruim no post' });
  }
};

module.exports = {
  create,
  findAll,
};