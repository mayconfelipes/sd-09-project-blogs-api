const BlogPost = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });

  blogPosts.associate = (models) => {
    blogPosts.hasOne(models.user,
      { foreignKey: 'id', as: 'userId' });
  };
  return blogPosts;
};

module.exports = BlogPost;
