module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

  // Categories.associate = (models) => {
  //   Categories.belongsToMany(models.PostsCategories,
  //     { foreignKey: 'categoryId', as: 'categories', through: 'PostsCategories' });
  // };

  return Categories;
};