const { BlogPosts, Category, User } = require('../models');
const { validateError } = require('../middlewares/validateUser');

const serviceRegisterPost = async (email, { title, categoryIds, content }) => {
  const { id } = await User.findOne({ where: { email } });
  const categorySearch = await Category.findOne({ where: { id: categoryIds } });  
  if (!categorySearch) return validateError(400, '"categoryIds" not found');
  const createPost = await BlogPosts.create({ userId: id, title, content });
  return createPost;
};

const serviceGetAll = async () => {
  const postsSearch = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  return postsSearch;
};

module.exports = { 
  serviceRegisterPost,
  serviceGetAll,
};