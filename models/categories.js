const Categories = (sequelize, DataTypes) => {
  const categorie = sequelize.define(
    'Categories',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  return categorie;
};

module.exports = Categories;