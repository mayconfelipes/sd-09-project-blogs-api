module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    timestamps: true, createdAt: 'published', updatedAt: 'updated', tableName: 'BlogPosts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

    BlogPost.belongsToMany(models.Category, {
      through: 'PostsCategories',
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return BlogPost;
}; 