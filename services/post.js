const { User, BlogPost, PostCategory } = require('../models');

const createPost = async (postData, userEmail) => {
  const { title, content, categoryIds } = postData;
  const published = Date.now();
  const updated = Date.now();

  const user = await User.findOne({ where: { email: userEmail } });

  const newPost = await BlogPost.create({ title, content, userId: user.id, published, updated });

  categoryIds.forEach((categoryId) => {
    PostCategory.create({ postId: newPost.id, categoryId });
  });

  return newPost;
};

module.exports = {
  createPost,
};
