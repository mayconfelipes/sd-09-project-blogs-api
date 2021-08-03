module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: 'Categories',
    },
  );

  return Category;
};
