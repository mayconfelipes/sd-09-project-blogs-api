const { Op } = require('sequelize');

const { Category, BlogPost, User } = require('../models');
const { schema, validateError } = require('./schemas/postSchema');
const {
  badRequest,
  notFound,
  unauthorized,
} = require('../helpers/getHttpStatusCode');

const checkIfCategoriesExist = async (categoryIds) => {
  const categories = await Promise.all(categoryIds.map((id) => Category.findByPk(id)));
  return categories.some((category) => category === null);
};

const checkIfPostExist = async (id) => {
  const post = await BlogPost.findByPk(id);
  return post;
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
  // Verifica se o post existe
  const searchedPost = await checkIfPostExist(postId);
  if (!searchedPost) throw validateError(notFound, 'Post does not exist');

  // Busca post por id
  const post = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const deletePost = async (postId, id) => {
  // Busca o id dono do post para verificacoes
  const post = await BlogPost.findByPk(postId);
  // Verifica se o post existe
  if (!post) throw validateError(notFound, 'Post does not exist');
  // Verifica se quem esta tentando remover o post e dono do post
  if (post.userId !== id) throw validateError(unauthorized, 'Unauthorized user');

  const result = await BlogPost.destroy({ where: { id } });

  return result;
};

/**
 * [Op.or] -> operador logico "ou"
 * [Op.like] -> operador like compara se existe a keyword
 * Fonte: https://sequelize.org/v5/manual/querying.html
 */
const searchKeyword = async (keyword) => {
  console.log('[keyword] >', keyword);
  const searchResult = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${keyword}%` } },
        { content: { [Op.like]: `%${keyword}%` } },
      ],
    },
  });

  console.log('[searchKeyword] > ', searchResult);

  return searchResult;
};

module.exports = {
  createPost,
  getAll,
  getById,
  deletePost,
  searchKeyword,
};
