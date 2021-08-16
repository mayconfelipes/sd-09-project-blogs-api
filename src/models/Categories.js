const fieldsCategories = (params) => ({
  id: { type: params.INTEGER, primaryKey: true, autoIncrement: true },
  name: params.STRING,
});

const configCategories = () => ({
  timestamps: false,
  tableName: 'Categories',
});

module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    'Categories',
    fieldsCategories(DataTypes),
    configCategories(),
  );

  return Categories;
};
