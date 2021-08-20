module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define(
    'PostsCategory', {}, { timestamps: false },
  );

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostsCategories;
};
