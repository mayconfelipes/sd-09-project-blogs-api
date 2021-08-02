const BlogPost = (sequelize, DataTypes) => {
  const defineBlogPost = sequelize.define('BlogPost', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
  },
    { updatedAt: 'updated', 
    createdAt: 'published',
  });
    defineBlogPost.associate = (models) => {
      defineBlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return defineBlogPost;
};

module.exports = BlogPost;