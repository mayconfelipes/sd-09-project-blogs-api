const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');

const create = async ({ title, content }, userId) => {
  const newBlogPost = await BlogPost.create({ title, content, userId });

  return newBlogPost.dataValues;
};

const getAll = async () => {
  const getAllBlogPost = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return getAllBlogPost;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return post;
};

const updatePost = async ({ title, content }, id) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const upatedPost = await BlogPost.findByPk(id, {
    include: {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
  });

  return upatedPost;
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const getPostsWithSearchTerm = async (searchTerm) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [{
        title: { [Op.like]: searchTerm },
      }, {
        content: { [Op.like]: searchTerm },
      }],
    },
    include: [{
      model: User,
      as: 'user',
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return posts;
};

module.exports = {
  create,
  getAll,
  getPostById,
  updatePost,
  deletePost,
  getPostsWithSearchTerm,
};