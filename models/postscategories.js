module.exports = (sequelize, DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie', { postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER }, { tableName: 'PostsCategories', timestamps: false });

   PostsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, { 
      as: 'posts',
      through: PostsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  // };
  // erro descoberto tabnine usava autocomplete com nome errado para foreignKey
  // PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategorie;
};
