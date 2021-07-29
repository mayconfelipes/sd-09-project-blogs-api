module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' } },
  }, { timestamps: true, createdAt: 'published', updatedAt: 'updated' });
  BlogPosts.associate = (models) => {
    BlogPosts.belongsToMany(models.Categories,
      { through: 'PostsCategories',
        as: 'categories',
        foreignKey: 'postId',
        otherKey: 'categoryId' });
      BlogPosts.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPosts;
};