const { BlogPost, PostsCategory, User, Category } = require('../models');
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
    categoriesId.forEach((categoryId) => PostsCategory.create({ postId, categoryId }));
    
    // const promisses = categoriesId.map((categoryId) => PostCategory.create({ postId, categoryId }));
    // const values = await Promise.all(promisses);
    // return values;
};

const findAllBlogPostService = async () => {
    const blogPosts = await BlogPost.findAll({ include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
    return blogPosts;
};

module.exports = {
    createPostService,
    createPostCategory,
    findAllBlogPostService,
};