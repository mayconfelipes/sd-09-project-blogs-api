const PostsCategories = (sequelize, _DataTypes) => {
  const CurrPostCategory = sequelize.define('PostsCategorie', { },
    { timestamps: false, tableName: 'PostsCategories' });
  CurrPostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: CurrPostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: CurrPostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return CurrPostCategory;
};

module.exports = PostsCategories;