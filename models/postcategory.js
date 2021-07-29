const PostCategory = (sequelize, _DataTypes) => {
  const newPostCategory = sequelize.define('PostCategory',
    { });

  newPostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: newPostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: newPostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return newPostCategory;
};

module.exports = PostCategory;
