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
  const createdObject = await BlogPost.create({ title, content, userId });
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

const getPostByTerm = async (search, searchTerm) => {
  const postByTerm = await BlogPost.findAll({
    where: { [`${search}`]: searchTerm },
    attributes: {
      include: ['published', 'updated'],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (postByTerm.length === 0) return null;
  return postByTerm;
};

const getBySearch = async (searchTerm) => {
  if (!searchTerm) {
    const everyPost = await getAll();
    return everyPost;
  }
  const postByTitle = await getPostByTerm('title', searchTerm);
  const postByContent = await getPostByTerm('content', searchTerm);
  if (!postByTitle && !postByContent) return [];
  return postByTitle || postByContent;
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
  return post;
};

const deleteById = async ({ id, userId }) => {
  const post = await BlogPost.findByPk(id);
  if (!post) throw validateError(404, 'Post does not exist');
  if (post.dataValues.id !== userId) throw validateError(401, 'Unauthorized user');
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  getBySearch,
  updateById,
  deleteById,
};