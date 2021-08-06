const Categories = (sequelize, DataTypes) => {
  const categorie = sequelize.define(
    'Categories',
    {
      name: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
      updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    {
      timestamps: false,
    },
  );
  return categorie;
};

module.exports = Categories;