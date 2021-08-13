const rescue = require('express-rescue');
const { checkPost, createPost } = require('../services/post');
const { createPostCategory } = require('../services/postCategory');
const { findCategories } = require('../services/categories');

const newPost = rescue(async (req, res) => {
  const { body, body: { categoryIds }, user: { id } } = req;

  const { error } = checkPost(body);
  if (error) return res.status(400).json(error.details[0]);

  const categories = await findCategories();
  const exists = categoryIds
    .every((category) => categories.find((c) => c.id === category));
  if (!exists) return res.status(400).json({ message: '"categoryIds" not found' });

  const created = await createPost({ title: body.title, content: body.content, userId: id });

  categoryIds.forEach(async (category) => {
    await createPostCategory({ postId: created.id, categoryId: category });
  });

  return res.status(201).json(created);
});

module.exports = { newPost };
