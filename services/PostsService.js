const Joi = require('@hapi/joi');
const { BlogPosts, Categories, Users } = require('../models');

const schemaPostCreate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
});

const validatePostData = (code, message) => ({ code, message });

const create = async ({ userId, title, content, categoryIds }) => {
  const { error } = schemaPostCreate.validate({ title, content, categoryIds });
  if (error) {
    const { message } = error.details[0];
    throw validatePostData(400, message);
  }

  const findCategories = await Categories.findAll();
  const categories = findCategories.map(({ id }) => id);
  const validCategories = categoryIds.every((category) => categories.includes(category));

  if (!validCategories) throw validatePostData(400, '"categoryIds" not found');

  const post = await BlogPosts.create({ userId, title, content });

  return post;
};

const getAll = async () => {
  const posts = await BlogPosts.findAll(
    { include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ] },
  );

  return posts;
}

module.exports = {
  create,
  getAll,
};