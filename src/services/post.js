const { BlogPost, PostsCategory, User, Category } = require('../models');

const create = async ({ title, content, categoryIds }, userId) => {
  const { dataValues } = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (categoryId) =>
    PostsCategory.create({ postId: dataValues.id, categoryId }));
  return dataValues;
};

const findAll = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] }).then((data) => data);

const findOne = ({ id }) => BlogPost.findOne({
  where: { id },
  include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] }).then((data) => data);

const update = async ({ title, content }, { id }) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const { dataValues } = await findOne({ id });
  return dataValues;
};

const destroy = ({ id }) => BlogPost.destroy({ where: { id } });

module.exports = { create, findAll, findOne, update, destroy };
