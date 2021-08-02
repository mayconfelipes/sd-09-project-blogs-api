const Joi = require('joi');
const { BlogPost, Categorie, User } = require('../models');

const postSchema = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.array().required(),
  content: Joi.string().required(),
});

const updateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const create = async ({ title, categoryIds, content, userId }) => {
  const { error } = postSchema.validate({ title, categoryIds, content });
  if (error) throw validateError(400, error.details[0].message);
  const categoryIdValid = await Promise.all(categoryIds.map((id) => Categorie.findByPk(id)));
  if (categoryIdValid.includes(null)) throw validateError(400, '"categoryIds" not found');
  // const allPosts = await BlogPost.findAll();
  // console.log(allPosts);
  const createdObject = await BlogPost.create({ title, content, userId });
  // console.log(createdObject, 'createdObject');
  const { id } = createdObject.dataValues;
  return id;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    attributes: {
      include: ['published', 'updated'],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  // console.log(posts, 'POSTS');
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    attributes: {
      include: ['published', 'updated'],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) throw validateError(404, 'Post does not exist');
  return post;
};

const updateById = async ({ id, userId, title, content, categoryIds }) => {
  if (categoryIds) throw validateError(400, 'Categories cannot be edited');
  const { error } = updateSchema.validate({ title, content });
  if (error) throw validateError(400, error.details[0].message);
  const { dataValues } = await BlogPost.findByPk(id);
  if (dataValues.id !== userId) throw validateError(401, 'Unauthorized user');
  await BlogPost.update({ title, content }, { where: { id } });
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log(post, 'post post post');
  return post;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
};