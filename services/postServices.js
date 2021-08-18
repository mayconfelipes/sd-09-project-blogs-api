const { Category, BlogPost, User } = require('../models');
const { schema, validateError } = require('./schemas/postSchema');
const { badRequest } = require('../helpers/getHttpStatusCode');

const checkIfCategoriesExist = async (categoryIds) => {
  const categories = await Promise.all(categoryIds.map((id) => Category.findByPk(id)));
  return categories.some((category) => category === null);
};

const createPost = async (postData) => {
  const { userId: _, ...data } = postData;

  // Valida a entrada de dados
  const { error } = schema.validate(data);
  if (error) throw validateError(badRequest, error.message);

  // Verifica as categorias existem
  const categoriesNotExists = await checkIfCategoriesExist(data.categoryIds);
  if (categoriesNotExists) throw validateError(badRequest, '"categoryIds" not found');

  // Cadastra um novo post
  const newPost = await BlogPost.create(postData);

  const { updated, published, ...createdPost } = newPost.dataValues;

  return createdPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    // model: [model], as: [apelido definido na associacao]
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getById = async (postId) => {
  const post = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

module.exports = { createPost, getAll, getById };
