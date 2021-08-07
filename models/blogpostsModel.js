module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  { updatedAt: 'updated', createdAt: 'published' });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    // BlogPosts.belongsToMany(models.Category, {
    //   as: 'categories',
    //   through: 'PostsCategories',
    // });
};

return BlogPosts;
};
