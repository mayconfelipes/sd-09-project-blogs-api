const PostCategory = (sequelize, _DataTypes) => {
  const newPostsCategory = sequelize.define('PostsCategory',
    { }, { timestamps: false });

  newPostsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: newPostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: newPostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return newPostsCategory;
};

module.exports = PostCategory;
