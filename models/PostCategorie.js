const PostCategories = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostsCategories', {}, { timestamps: false });

  PostCategorie.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'blogPosts',
      through: PostCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategorie;
};

module.exports = PostCategories; 