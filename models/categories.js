const defineCategoryModels = (sequelize, DataTypes) => {
  const Category = sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  
  return Category;
};

module.exports = defineCategoryModels;
