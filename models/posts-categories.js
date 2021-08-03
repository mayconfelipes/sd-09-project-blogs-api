module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    timestamps: false,
    tableName: 'PostsCategories',
    underscored: false,
  });

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.BlogPost, 
      { foreignKey: 'postId', as: 'posts' });
    PostCategory.belongsTo(models.Category, 
      { foreignKey: 'categoryId', as: 'categories' });
  };

  return PostCategory;
};