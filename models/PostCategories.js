module.exports = (sequelize, _DataTypes) => {
  const postCategories = sequelize.define('PostsCategories', { }, { timestamps: false });

  postCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: postCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: postCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return postCategories;
};
