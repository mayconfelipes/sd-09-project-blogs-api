module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', { postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER }, { tableName: 'PostsCategories', timestamps: false });
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategory;
};
