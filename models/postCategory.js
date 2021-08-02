module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
  {},
  { timestamps: false, tableName: 'PostsCategories' });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory, as: 'categories', foreignKey: 'postId', otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory, as: 'post', foreignKey: 'categoryId', otherKey: 'postId',
    });
  };

  return PostCategory;
};
