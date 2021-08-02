const Joi = require('joi');
const { BlogPost, Categorie, User } = require('../models');

const postSchema = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.array().required(),
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
  console.log(id, 'ID ID ID POST');
  return id;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    attributes: {
      include: ['published', 'updated'],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      // { model: Categorie, as: 'Categories', through: { attributes: [] } },
    ],
  });
  console.log(posts, 'POSTS');
  return posts;
};

module.exports = {
  create,
  getAll,
};