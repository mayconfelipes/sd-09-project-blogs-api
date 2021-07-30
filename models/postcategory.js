module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostsCategories', {}, { timestamps: false });
  PostCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categoryId',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  PostCategory.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostCategory;
};