module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, { timestamps: false });
  
Categories.associate = (models) => {
    Categories.belongsToMany(models.BlogPosts,
      { through: 'PostsCategories',
        as: 'categories',
        foreignKey: 'categoryId',
        otherKey: 'postId' });
  };

  return Categories;
};