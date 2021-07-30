module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'Categories',
  });

  return Categorie;
};
