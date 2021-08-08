const { BlogPost } = require('../models');
const { User } = require('../models');
const { Categorie } = require('../models');
const categorieService = require('./Categories');

const createPosts = async (body, user) => {
  const { categoryIds, ...otherInfo } = body;
  
  const allCategories = await categorieService.getCategories();
  const allCategoriesMappedAndIncluded = allCategories.map((item) => item.dataValues.id);

  if (!categoryIds.some((r) => allCategoriesMappedAndIncluded.includes(r))) {
    return { error: { code: 'categoryNotFound', message: '"categoryIds" not found' } };
  }

  const result = await BlogPost.create({
    ...otherInfo, 
    userId: user.id,
    published: new Date(),
    updated: new Date(),
  });

  const { published, updated, ...other } = result.dataValues;
  return other;
};

const getAllPosts = async () => {
  const result = await BlogPost.findAll({ 
    include: [
    { model: User, as: 'user' },
    { model: Categorie, as: 'categories', through: { attributes: [] } },
  ] });
  return result;
};

module.exports = {
  createPosts,
  getAllPosts,
};
