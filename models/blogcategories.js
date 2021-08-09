module.exports = (sequelize, DataTypes) => {
  const BlogCategories = sequelize.define('BlogCategories', {
    postId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
  },
    {
      timestamps: false,
      tableName: 'BlogCategories',
    });
  BlogCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      through: BlogCategories, foreignKey: 'categoryId', otherKey: 'postId', as: 'blogPostsCat',
    });
    models.Categories.belongsToMany(models.BlogPosts, {
      through: BlogCategories, foreignKey: 'postId', otherKey: 'categoryId', as: 'catBlogPosts',
    });
  };
  return BlogCategories;
};