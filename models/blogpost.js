module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPost.associate = (model) => {
    BlogPost.belongsTo(model.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPost;
};