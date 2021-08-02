const { validationResult, matchedData } = require('express-validator');
const { BlogPost, User, Category } = require('../models');
const PostService = require('../services/PostService');

module.exports = {
  add: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { code, message } = errors.errors[0].msg;
      return res.status(code).json({ message });
    }
    const { categoryIds } = req.body;
    const invalidCat = await PostService.validateCategories(categoryIds);
    if (!invalidCat) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    const data = matchedData(req);
    const token = req.headers.authorization;
    const fields = await PostService.setFields(token, data);
    const post = await BlogPost.create(fields);
    console.log(data);
    res.status(201).json(post);
  },
  listAll: async (req, res) => {
    const posts = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'displayName', 'email', 'image'],
        },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    res.send(posts);
  },
  listOne: async (req, res) => {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'displayName', 'email', 'image'],
        },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  },
};
