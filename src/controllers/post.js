const { BlogPost, PostsCategory, User, Category } = require('../models');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  const { dataValues } = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (categoryId) =>
    PostsCategory.create({ postId: dataValues.id, categoryId }));
  res.status(201).json(dataValues);
};

const getAll = (_req, res) => BlogPost.findAll({
  include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] }).then((data) => res.status(200).json(data));

const getById = (req, res) => BlogPost.findOne({
  where: { id: req.params.id },
  include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] }).then((data) => res.status(200).json(data));

module.exports = { create, getAll, getById };
