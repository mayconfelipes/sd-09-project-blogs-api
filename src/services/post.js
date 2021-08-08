const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const include = [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } }];

const create = ({ title, content, categoryIds }, userId) =>
  BlogPost.create({ title, content, userId }).then((post) => {
    post.addCategory(categoryIds); return post;
  });

const findAll = () => BlogPost.findAll({ include });

const findOne = ({ id }) => BlogPost.findOne({ where: { id }, include });

const update = (post, { id }) => BlogPost.update(post, { where: { id } })
  .then(() => findOne({ id }));

const destroy = ({ id }) => BlogPost.destroy({ where: { id } });

const search = ({ q }) => BlogPost.findAll({ where: { [Op.or]: [
  { title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }] },
  include });

module.exports = { create, findAll, findOne, update, destroy, search };
