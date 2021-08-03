const { PostsCategories } = require('../models');

const insertPostAndCategoryIds = async (categoriesId, postId) => {
  categoriesId.forEach((categoryId) =>
    PostsCategories.bulkCreate([{ postId, categoryId }]));
};

module.exports = {
  insertPostAndCategoryIds,
};
