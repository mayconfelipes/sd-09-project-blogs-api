module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  // https://sequelize.org/v5/manual/models-definition.html#configuration -> como mudar o nome do timestamp
  { createdAt: 'published',
    updatedAt: 'updated' });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
    // BlogPost.hasMany(models.Category,
    //   { foreignKey: 'postId', as: 'posts' });
  };

  return BlogPost;
};