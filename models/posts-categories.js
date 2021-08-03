module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    timestamps: false,
    tableName: 'PostsCategories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.BlogPost, 
      { foreignKey: 'post_id', as: 'posts' });
    PostCategory.belongsTo(models.Category, 
      { foreignKey: 'category_id', as: 'categories' });
  };

  return PostCategory;
};