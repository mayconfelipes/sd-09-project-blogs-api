const PostsCategories = (sequelize, _DataTypes) => {
    const postsCategories = sequelize.define('PostsCategories', {}, { timestamps: false });
  
    postsCategories.associate = (models) => {
      models.BlogPosts.belongsToMany(models.Category, { 
        as: 'categories',
        through: postsCategories,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
  
      models.Category.belongsToMany(models.BlogPosts, { 
        as: 'posts',
        through: postsCategories,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    };
  
    return postsCategories;
  };
  
  module.exports = PostsCategories;