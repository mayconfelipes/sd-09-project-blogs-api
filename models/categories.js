module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories',
    {
      name: DataTypes.STRING,
    },
    { timestamps: false },
  );

  Categories.associate = (models) => {
    Categories.hasMany(models.PostsCategories, {
      foreignKey: 'categoryId',
      as: 'postsCategories',
    });
  };

  return Categories;
};
