module.exports = (sequelize, DataTypes) => {
  const PostCategorie = sequelize.define(
    'PostCategorie', {}, { timestamps: false });

   PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.BlogPost, {
      as: 'Categories',
      through: PostCategorie,
      foreingKey: 'id',
      otherKey: 'postId',
    });
  // };

  // PostCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.Categorie, { 
      as: 'BlogPosts',
      through: PostCategorie,
      foreingKey: 'id',
      otherKey: 'categoryId',
    });
  };

  return PostCategorie;
};