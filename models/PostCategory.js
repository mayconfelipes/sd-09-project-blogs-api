module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
    {}, { timestamps: false });

  PostsCategory.associate = (model) => {
    model.Category.belongsToMany(model.BlogPost, {
      as: 'posts',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    model.BlogPost.belongsToMany(model.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostsCategory;
};