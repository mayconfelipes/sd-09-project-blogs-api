module.exports = (sequelize, DataTypes) => {
  const CategoryStructure = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return CategoryStructure;
};
