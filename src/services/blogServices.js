const { BlogPost } = require('../models');
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

module.exports = {
  addPost,
};
