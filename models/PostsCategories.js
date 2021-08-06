module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {}, { timestamps: false });

  PostsCategories.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategories;
};