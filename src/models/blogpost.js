module.exports = (sequelize, DataTypes) => {
  const BlogsPosts = sequelize.define('BlogPosts', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, 
  { timestamps: false },
  { tableName: 'BlogPosts' });

  BlogsPosts.associate = (models) => {
    BlogsPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  };

  return BlogsPosts;
};