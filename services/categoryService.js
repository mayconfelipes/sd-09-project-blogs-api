const joi = require('joi');
const { Category } = require('../models');

const verifyCategoryInfo = (infos) => (
  joi.object({
    name: joi.string().required(),
  }).validate(infos)
);

const registerCategoryService = async (categoryInfos) => {
  const { error } = verifyCategoryInfo(categoryInfos);
  if (error) {
    return { error };
  }
  try {
    const newCategory = await Category.create(categoryInfos);
    return { response: newCategory };
  } catch (e) {
    return { error: e.message };
  }
};

const getAllCategoriesService = async () => {
  try {
    const categories = await Category.findAll();
    return { response: categories };
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  registerCategoryService,
  getAllCategoriesService,
};
