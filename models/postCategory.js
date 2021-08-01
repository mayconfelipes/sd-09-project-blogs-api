module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostsCategory', 
  {},
  { timestamps: false });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory, as: 'category', foreignKey: 'postId', otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory, as: 'post', foreignKey: 'categoryId', otherKey: 'postId',
    });
  };

  return PostCategory;
};
