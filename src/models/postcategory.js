module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostCategories', {}, { timestamps: false });

  PostsCategories.associate = (models) => {
    models.Categories.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategories;
};