module.exports = (sequelize, DataTypes) => {
  const BlogsPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, 
  { 
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogsPosts.associate = (models) => {
    BlogsPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  };

  return BlogsPosts;
};