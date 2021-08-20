const definePostsCategoriesModels = (sequelize, _DataTypes) => {
  const postsCategory = sequelize.define('PostsCategories', {},
  { timestamps: false });

  postsCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: postsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: postsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postsCategory;
};

module.exports = definePostsCategoriesModels;
