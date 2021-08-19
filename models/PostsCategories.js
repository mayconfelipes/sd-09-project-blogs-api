module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
  },
  { timestamps: false, tableName: 'PostsCategories' });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, { through: models.PostCategory });
    models.Category.belongsToMany(models.BlogPost, { through: models.PostCategory });
  };

  return PostCategory;
};
