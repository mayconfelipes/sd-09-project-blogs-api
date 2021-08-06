module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
   {},
   { timestamps: false });

   PostsCategory.associate = (models) => {
     models.Category.belongsToMany(models.BlogPost, {
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'post',
     });

     models.BlogPost.belongsToMany(models.Category, {
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
     });
   };

  return PostsCategory;
};