const { BlogPost } = require('../models');
const schemas = require('../middlewares/schemas');
const validate = require('../middlewares/validators');

const create = async (req) => {
    const { body, user } = req;
    const { title, content, categoryIds } = body;
    try {
      await schemas.postSchema(body);
      await validate.categoryIdsValidation(categoryIds);
    } catch (error) {
      return error;
    }
    const post = await BlogPost.create({ title, content, userId: user });
    return {
      status: 201,
      id: post.id,
      userId: post.userId,
      title: post.title,
      content: post.content,
    };
  };

module.exports = { create };