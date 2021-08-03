module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategories',
   {},
   { timestamps: false });

   PostsCategorie.associate = (models) => {
     models.Categories.belongsToMany(models.BlogPosts, {
      through: PostsCategorie,
      foreignKey: 'categoriesId',
      otherKey: 'postsId',
      as: 'post',
     });

     models.BlogPosts.belongsToMany(models.Categories, {
      through: PostsCategorie,
      foreignKey: 'postsId',
      otherKey: 'categoriesId',
      as: 'categories',
     });
   };

  return PostsCategorie;
};