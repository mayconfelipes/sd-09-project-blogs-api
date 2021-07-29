module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
  };

  return BlogPost;
};
