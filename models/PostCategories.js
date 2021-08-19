module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategories', {}, { timestamps: false });

  PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categories, {
      as: 'postId',
      through: PostCategorie,
      foreignKey: 'id',
      otherKey: 'categoryId',
    });
    models.Categories.belongsToMany(models.BlogPost, {
      as: 'categoryId',
      through: PostCategorie,
      foreignKey: 'id',
      otherKey: 'postId',
    });
  };

  return PostCategorie;
};
