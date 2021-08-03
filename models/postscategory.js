module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, { timestamps: false });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId' });
      
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId' });
  };
  return PostsCategory;
};