module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
  {}, { timestamps: false });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignkey: 'postId',
      otherKey: 'categoryId', 
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostsCategory,
      foreignkey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategory;
};
