const { BlogPost, Category } = require('../models');

const createPost = async ({ title, content, categoryIds }) => {
  const categoryExistsResponse = categoryIds.map((id) => Category.findByPk(id));

  const categoryExists = await Promise.all(categoryExistsResponse);

  if (categoryExists.includes(null)) {
    return {
      error: {
        code: 'badRequest',
        message: '"categoryIds" not found',
      },
    };
  }

  await BlogPost.create({ title, content });

  const post = BlogPost.findOne({ where: { title, content } });

  return post;
};

module.exports = {
  createPost,
};
