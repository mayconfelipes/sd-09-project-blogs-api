const { Op } = require('sequelize');
const Schema = require('../Utils/schemas');
const ValidateError = require('../Utils/validateError');
const { BlogPost, Category, User } = require('../models');

const addPost = async (postData) => {
  const { body, user: { dataValues } } = postData;

  const { error } = Schema.post.validate(body);
  if (error) throw ValidateError(400, error.message);

  console.log(body.categoryIds);
  const category = await Category.findAll({ where: { id: {
    [Op.in]: body.categoryIds,
  } } });

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

const findAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const findById = async (id) => {
  const result = await BlogPost.findOne({ id });
  return result;
};

module.exports = { addPost, findAll, findById };