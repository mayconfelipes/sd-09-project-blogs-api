module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
    {
      timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
      tableName: 'Categories',
    });

    Categories.associate = (models) => {
    Categories.hasOne(models.PostsCategories,
      { foreignKey: 'categoryId', as: 'PostsCategories' });
  };

  return Categories;
};