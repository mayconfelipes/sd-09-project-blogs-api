const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategories = sequelize.define('PostsCategory', {
  }, { timestamps: false });
  postsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'postId',
      as: 'post',
      through: postsCategories,
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      as: 'categories',
      through: postsCategories,
    });
  };

  return postsCategories;
};

module.exports = PostsCategory;