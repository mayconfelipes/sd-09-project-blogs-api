const { BlogPost } = require('../models');
const { validatePostFormat } = require('../services/PostsServices');
require('dotenv').config();

const InsertPost = async (req, res, next) => {
  const { body, id } = req;
  try {
    const validate = validatePostFormat(body);
    if (!validate) {
      const { code, message } = validate;
      return res.status(code).json(message);
    }
    const post = {
      ...body,
      userId: id,
      published: new Date(),
      updated: new Date(),
    };

    const inserted = await BlogPost.create({ ...post });
    return res.status(201).json(inserted);
  } catch (err) {
    next(err);
  }
};

module.exports = InsertPost;
