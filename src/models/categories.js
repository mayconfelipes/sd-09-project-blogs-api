module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Categories',
  });

  return Categories;
};