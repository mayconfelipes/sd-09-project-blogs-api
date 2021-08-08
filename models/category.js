const Category = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    {
      tableName: 'Categories',
      underscored: true,
      timestamps: false,
    },
  );

  return Categories;
};

module.exports = Category;