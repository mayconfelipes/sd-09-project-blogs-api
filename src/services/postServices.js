const { BlogPost, PostsCategory } = require('../models');

const createPost = async ({ title, content, categoryIds }, userId) => {
  const post = await BlogPost.create({ userId, title, content });
  categoryIds.forEach(async (categoryId) =>
    PostsCategory.create({ postId: post.id, categoryId }));
  return post;
};

module.exports = { createPost };
