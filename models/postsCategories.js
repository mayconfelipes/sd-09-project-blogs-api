module.exports = (sequelize, _DataTypes) => {
 const PostsCategories = sequelize.define(
   'PostCategories', {}, { timestamps: false },
 ); 

 PostsCategories.associate = (models) => {
  models.Categories.belongsToMany(models.BlogPosts, {
    as: 'blogsposts',
    through: PostsCategories,
    foreignKey: 'categoryId',
    otherKey: 'blogPostsId',
  });

  models.BlogPosts.belongsToMany(models.Categories, {
    as: 'categories',
    through: PostsCategories,
    foreignKey: 'blogPostsId',
    otherKey: 'categoryId',
  });
};
 return PostsCategories;
};