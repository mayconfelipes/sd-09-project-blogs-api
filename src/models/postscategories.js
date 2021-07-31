const PostsCategories = (sequelize, _DataTypes) => {
  const CurrPostCategory = sequelize.define('PostsCategorie', { },
    { timestamps: false, tableName: 'PostsCategories' });
  CurrPostCategory.associate = (models) => {
    models.Post.belongsToMany(models.Categories, {
      as: 'Posts',
      through: CurrPostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.Post, {
      as: 'Categories',
      through: CurrPostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return CurrPostCategory;
};

module.exports = PostsCategories;