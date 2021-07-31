module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  });
  
  return Categories;
};