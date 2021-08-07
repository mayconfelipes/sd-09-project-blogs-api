module.exports = (sequelize, _Datatypes) => {
  const PostsCategories = sequelize.define('PostsCategory', {},
  { timestamps: false });
  PostsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'blogPosts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategories;
};
