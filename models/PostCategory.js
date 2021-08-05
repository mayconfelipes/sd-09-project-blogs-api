module.exports = (sequelize, _DataTypes) => {
    const postCategory = sequelize.define('PostsCategory', {}, { timestamps: false });

    postCategory.associate = (models) => {
        models.BlogPosts.belongsToMany(models.Category, {
            as: 'categories',
            through: postCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });

        models.Category.belongsToMany(models.BlogPosts, {
            as: 'posts',
            through: postCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        },
            { timestamps: false });
    };

    return postCategory;
};