module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define(
    'PostsCategorie', {}, { timestamps: false },
  );

   PostsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, { 
      as: 'post',
      through: PostsCategorie,
      foreingKey: 'categoryId',
      otherKey: 'postId',
    });
  // };

  // PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categorie',
      through: PostsCategorie,
      foreingKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategorie;
};

