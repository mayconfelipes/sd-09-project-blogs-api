const Category = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return categories;
};

module.exports = Category;