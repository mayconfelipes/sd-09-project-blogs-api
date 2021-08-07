// const jwt = require('jsonwebtoken');
const { Category } = require('../models');

// const SECRET = 'mysupersecret';

// const createToken = (tokenCategory) => {
//   const token = jwt.sign(tokenCategory, SECRET, {
//     expiresIn: '3d',
//     algorithm: 'HS256',
//   });
//   return token;
// };

const createCategories = async ({ name }) => {
  const categoryCreate = await Category.create({ name });
  // console.log('service', categoryCreate);
  return categoryCreate;
};

const getCategoriesService = async () => {
  const getCategory = await Category.findAll();
  console.log('service', getCategory);
  return getCategory;
};

module.exports = {
  createCategories,
  getCategoriesService,
};