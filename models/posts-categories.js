module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    timestamps: false,
    tableName: 'PostsCategories',
    underscored: true,
  });

  PostsCategories.associate = (models) => {
    PostsCategories.belongsTo(models.BlogPosts, 
      { foreignKey: 'post_id', as: 'posts' });
    PostsCategories.belongsTo(models.Categories, 
      { foreignKey: 'category_id', as: 'categories' });
  };

  return PostsCategories;
};