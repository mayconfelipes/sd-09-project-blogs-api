const PostsCategory = (sequelize, _DataTypes) => {
  const newPostsCategory = sequelize.define('PostsCategory', {
  }, { timestamps: false });

  newPostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: newPostsCategory,
      as: 'blogs',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: newPostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return newPostsCategory;
};

module.exports = PostsCategory;