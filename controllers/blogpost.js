const rescue = require('express-rescue');
const { User } = require('../models');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { PostsCategory } = require('../models');

const insertBlogPost = rescue(async (req, res) => {
  const post = req.body;
  const { email } = req.user;
  const { title, content, categoryIds } = post;

  const { id: userId } = await User.findOne({ where: { email } });
  console.log(userId);
  const newPost = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (id) => { 
    await PostsCategory.create({ postId: newPost.id, categoryId: id }); 
  });

  return res.status(201).json(newPost);
});

const listAllPosts = rescue(async (_req, res) => {
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});
  return res.status(200).json(posts);
});

module.exports = {
  insertBlogPost,
  listAllPosts,
}; 