const { BlogPost, User, Category } = require('../models');
const blogValidations = require('../validations/blogValidations');

async function addPost(title, content, categoryIds, token) {
  blogValidations.validateTitle(title);
  blogValidations.validateContent(content);
  await blogValidations.validateCategoryIds(categoryIds);
  const { data } = blogValidations.validateToken(token);
  const newPost = await BlogPost.create({
    userId: data.id,
    title,
    content,
  });
  return { status: 201, response: newPost.dataValues };
}

async function getPosts(token) {
  blogValidations.validateToken(token);
  const postList = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { through: [] } },
    ],
  });
  return { status: 200, response: postList };
}

module.exports = {
  addPost,
  getPosts,
};
