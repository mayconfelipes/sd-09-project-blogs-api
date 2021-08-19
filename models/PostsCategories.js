module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
  },
  { timestamps: false, tableName: 'PostsCategories' });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: models.PostCategory,
      as: 'categories',
      foreignKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: models.PostCategory,
      as: 'posts',
      foreignKey: 'postId',
    });
  };

  return PostCategory;
};
