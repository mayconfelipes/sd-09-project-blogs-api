module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
  {},
  { timestamps: false });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsTo(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostsCategory,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return PostsCategory;
}; 