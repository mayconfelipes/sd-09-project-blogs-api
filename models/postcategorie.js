const PostsCategorie = (sequelize, _DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategory', {},
  { timestamps: false });

  postsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: postsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: postsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return postsCategorie;
};

module.exports = PostsCategorie;