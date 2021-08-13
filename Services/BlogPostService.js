const { Op } = require('sequelize');
const Schema = require('../Utils/schemas');
const ValidateError = require('../Utils/validateError');
const { BlogPost, Category, User } = require('../models');

const addPost = async (postData) => {
  const { body, user: { dataValues } } = postData;

  const { error } = Schema.post.validate(body);
  if (error) throw ValidateError(400, error.message);

  const category = await Category.findAll({ where: { id: { [Op.in]: body.categoryIds } } });
  if (category.length !== body.categoryIds.length) {
    throw ValidateError(400, '"categoryIds" not found');
  }

  const listPost = await BlogPost.create({
    title: body.title,
    content: body.content,
    userId: dataValues.id,
  });
  return listPost;
};

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const findById = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) throw ValidateError(404, 'Post does not exist');

  return result;
};

const updatedPost = async (id, body, user) => {
  const { error } = Schema.updated.validate(body);
  if (error) throw ValidateError(400, error.message);

  const { title, content } = body;
  if (body.categoryIds) throw ValidateError(400, 'Categories cannot be edited');

  const { dataValues } = user;
  const { userId } = await BlogPost.findByPk(id);
  if (userId !== dataValues.id) throw ValidateError(401, 'Unauthorized user');

  await BlogPost.update({ title, content }, { where: { id } });

  const result = await BlogPost.findOne({
    where: { id }, include: { model: Category, as: 'categories' },
  });

  return result;
};

const deletePost = async (id, user) => {
  const { dataValues } = user.dataValues;
  if (!await BlogPost.findByPk(id)) throw ValidateError(404, 'Post does not exist');

  const post = await BlogPost.findByPk(id);
  if (post.dataValues.userId !== dataValues.id) throw ValidateError(401, 'Unauthorized user');

  await BlogPost.destroy({ where: { id } });
  return true;
};

const findByTitle = async (title) => {
  if (!title) return getAll();

  const post = await BlogPost.findOne({
    where: {
      [Op.or]: [{ title }, { content: title }],
    },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return [];

  return [post];
};

module.exports = { addPost, getAll, findById, updatedPost, deletePost, findByTitle };