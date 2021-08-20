const defineBlogPostsModels = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return blogPost;
};

module.exports = defineBlogPostsModels;
