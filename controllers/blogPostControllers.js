require('dotenv').config();
const Joi = require('joi');
const { BlogPosts, Categories } = require('../models');
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

      categoryIds.map(async (element) => {
        const categoryExists = await Categories.count({ where: element });

        if (categoryExists === 0) {
          return next({ statusCode: 400, message: '"categoryIds" not found' });
        }

        const newPost = await BlogPosts.create({
          title,
          content,
          userId: categoryIds[0],
        });

        return res.status(201).json(newPost);
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
