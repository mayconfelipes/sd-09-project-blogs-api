require('dotenv').config();
const Joi = require('joi');
const { BlogPost, Category } = require('../models');
const validate = require('../middlewares/validate');

module.exports = {
  validateFields: validate(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  })),

  addPost: async (req, res, next) => {
    try {
      const { title, content, categoryIds } = req.body;

      categoryIds.forEach(async (element) => {
        const categoryExists = await Category.count({ where: element });
        console.log('L19', categoryExists);
        if (categoryExists === 0) {
          return next({ statusCode: 400, message: '"categoryIds" not found' });
        }
      });

      const newPost = await BlogPost.create({
        title,
        content,
        userId: categoryIds[0],
      });

      return res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
