const PostsCategories = (sequelize) => {
  const postsCategories = sequelize.define('postsCategories',
   { },
   { timestamps: false });
  
    PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, { 
      through: PostsCategories,
      foreignkey: 'id',
      otherkey: 'categoryId', 
    });
  
    models.Categories.belongsToMany(models.BlogPosts, {
      through: PostsCategories,
      foreignkey: 'id',
      otherkey: 'postId', 
    });
  };  
  return postsCategories;
};

module.exports = PostsCategories;