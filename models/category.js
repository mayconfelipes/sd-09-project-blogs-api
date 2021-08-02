module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  { timestamps: false },
  {
    sequelize,
    modelName: 'category',
  });
  return category;
};