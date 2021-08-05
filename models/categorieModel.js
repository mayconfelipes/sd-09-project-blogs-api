const defineCategorieModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });
  return Category;
};

module.exports = defineCategorieModel;