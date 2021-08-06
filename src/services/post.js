const { Op } = require('sequelize');
const { BlogPost, PostsCategory, User, Category } = require('../models');

const include = [{ model: User, as: 'user' },
  { model: Category, as: 'categories', through: { attributes: [] } }];

const create = async ({ title, content, categoryIds }, userId) => {
  const data = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (categoryId) =>
    PostsCategory.create({ postId: data.id, categoryId }));
  return data;
};

const findAll = () => BlogPost.findAll({ include });

const findOne = ({ id }) => BlogPost.findOne({ where: { id }, include });

const update = (post, { id }) => BlogPost.update(post, { where: { id } })
  .then(() => findOne({ id }));

const destroy = ({ id }) => BlogPost.destroy({ where: { id } });

const search = ({ q }) => BlogPost.findAll({ where: { [Op.or]: [
  { title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }] },
  include });

module.exports = { create, findAll, findOne, update, destroy, search };
