const { BlogPost } = require('../models');
const categorieService = require('./Categories');

const createPosts = async (body, user) => {
  const { categoryIds: categoryId, ...otherInfo } = body;

  const allCategories = await categorieService.getCategories();

  // if (!categoryId.includes(allCategories)) {
  //   return {
  //     error: {
  //       code: 'categoryNotFound',
  //       message: '"categoryIds" not found',
  //     },
  //   };
  // }
  console.log(categoryId);
  console.log(allCategories);

  const result = await BlogPost.create({
    ...otherInfo, 
    userId: user.id,
    published: new Date(),
    updated: new Date(),
  });

  await result.addCategory(categoryId, { through: {} });

  return result;
};

module.exports = {
  createPosts,
};
