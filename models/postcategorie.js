module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {}, { timestamps: false });

  PostCategorie.associate = (models) => {
    models.BlogPost.belongsTo(models.BlogPost, {
      as: 'postId',
      through: PostCategorie,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.User.belongsToMany(models.Category, {
      as: 'categoryId',
      through: PostCategorie,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return PostCategorie;
};
