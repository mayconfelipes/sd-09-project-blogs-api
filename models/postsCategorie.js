module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostsCategorie', 
  {},
  { timestamps: false });

  PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'Categories',
      through: PostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategorie;
};
