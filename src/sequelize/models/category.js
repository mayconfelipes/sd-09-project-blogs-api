const Category = (sequelize, DataTypes) => {
  const newCategory = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, { timestamps: false });

  return newCategory;
};

module.exports = Category;