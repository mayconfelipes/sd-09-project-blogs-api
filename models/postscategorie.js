module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategories',
   {},
   { timestamps: false });

   PostsCategorie.associate = (models) => {
     models.Categories.belongsToMany(models.BlogPosts, {
      trough: PostsCategorie,
      foreignKey: 'categoriesId',
      otherKey: 'postsId',
      as: 'post',
     });

     models.BlogPost.belongsToMAny(models.Categories, {
      trough: PostsCategorie,
      foreignKey: 'postsId',
      otherKey: 'categoriesId',
      as: 'categories',
     });
   };

  return PostsCategorie;
};