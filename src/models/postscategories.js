const PostsCategories = (sequelize, _DataTypes) => {
  const CurrPostCategory = sequelize.define('PostsCategorie', { },
    { timestamps: false, tableName: 'PostsCategories' });
  CurrPostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'BlogPosts',
      through: CurrPostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'Categories',
      through: CurrPostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return CurrPostCategory;
};

module.exports = PostsCategories;