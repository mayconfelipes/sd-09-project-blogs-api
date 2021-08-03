const constraints = (DataTypes) => ({
  name: DataTypes.STRING,
});

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    constraints(DataTypes),
    { timestamps: false },
  );

  return Category;
};