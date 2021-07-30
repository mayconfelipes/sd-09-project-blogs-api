const Categories = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  });

  return categories;
};

module.exports = Categories;
