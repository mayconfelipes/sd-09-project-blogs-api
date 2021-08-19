const { User, BlogPost, PostCategory, Category } = require('../models');

const createPost = async (postData, userEmail) => {
  const { title, content, categoryIds } = postData;
  const categories = [];
  let error = false;

  categoryIds.forEach((cat) => categories.push(Category.findByPk(cat)));

  const categoryList = await Promise.all(categories);

  categoryList.forEach((cat) => {
    if (!cat) error = true;
  });

  if (error) return { message: '"categoryIds" not found', statusCode: 400 };

  const user = await User.findOne({ where: { email: userEmail } });

  const newPost = await BlogPost.create(
    { title, content, userId: user.id, published: Date.now(), updated: Date.now() },
  );

  categoryIds.forEach((categoryId) => {
    PostCategory.create({ postId: newPost.id, categoryId });
  }); 

  return newPost;
};

const readPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const readPost = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return { message: 'Post does not exist', statusCode: 404 };

  return post;
};

module.exports = {
  createPost,
  readPosts,
  readPost,
};
