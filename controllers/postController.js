const rescue = require('express-rescue');
const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');
const services = require('../services');

const createPost = rescue(async (req, res, _next) => {
  const { id } = req.user;
  console.log(req.user);
  const newPost = await services.createPost(req.body, id);

  return res.status(201).json(newPost);
});

const listAllPosts = rescue(async (req, res) => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  res.status(200).json(posts);
});

const findPostById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const [post] = await BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  if (!post) return next({ statusCode: 404, message: 'Post does not exist' });

  res.status(200).json(post);
});

const updatePostById = rescue(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const updated = await services.updatePostById(req.body, id, userId);

  res.status(200).json(updated);
});

const deletePostById = rescue(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const deleted = await services.deletePostById(id, userId);

  res.status(204).json(deleted);
});

const searchTerm = rescue(async (req, res) => {
  const search = req.query.q;

  const post = await BlogPost.findAll({
    where: { 
      [Op.or]: [{ title: { [Op.substring]: search } }, { content: { [Op.substring]: search } }]
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  return res.status(200).json(post);
});

module.exports = {
  createPost,
  listAllPosts,
  findPostById,
  updatePostById,
  deletePostById,
  searchTerm,
};