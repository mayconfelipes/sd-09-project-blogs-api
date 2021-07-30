const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    published: { type: DataTypes.DATE(6) },
    updated: { type: DataTypes.DATE(6) },
    createdAt: { allowNull: false, defaultValue: DataTypes.NOW, type: DataTypes.DATE },
    updatedAt: { allowNull: false, defaultValue: DataTypes.NOW, type: DataTypes.DATE },
  });
blogPosts.associate = (models) => {
blogPosts.belongsTo(models.User, { as: 'user', foreignkey: 'userId' });
blogPosts.belongsToMany(models.Categories, { 
  as: 'categories',
  through: 'PostsCategories',
  foreignkey: 'categoryId', 
  }); 
};

  return blogPosts;
};

module.exports = BlogPosts;