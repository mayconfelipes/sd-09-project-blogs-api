const { BlogPost, PostCategory } = require('../models');
const { findAllCategories } = require('./categoryService');

const createPostService = async (title, content, categoryIds, userId) => {
    const published = Date.now();
    const updated = Date.now();

    const categories = await findAllCategories();
    const canCreate = categories.some((category) => categoryIds.includes(category.id));

    if (!canCreate) return { error: '"categoryIds" not found' };

    const { dataValues } = await BlogPost
      .create({ title, content, categoryIds, published, updated, userId });

    const post = {
        id: dataValues.id,
        userId: dataValues.userId,
        title: dataValues.title,
        content: dataValues.content,
    };

    return post;
};

const createPostCategory = async (postId, categoriesId) => {
    const promisses = categoriesId.map((categoryId) => PostCategory.create({ postId, categoryId }));
    const values = await Promise.all(promisses);
    console.log(values, '<<<<< Pr');
    return values;
};

module.exports = {
    createPostService,
    createPostCategory,
};