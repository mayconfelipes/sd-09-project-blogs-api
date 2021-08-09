module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return BlogPost;
};